var app = window.app || {},
business_paypal = 'jair_mm@live.com.mx'; // aquÌ va tu correo electrÛnico de paypal

(function($){
	'use strict';

	//no coflict con underscores

	app.init = function(){
		//totalItems totalAmount
		var total = 0,
		items = 0
		
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
		
		if(undefined != cart.items && cart.items != null && cart.items != '' && cart.items.length > 0){
			_.forEach(cart.items, function(n, key) {
			   items = (items + n.cant)
			   total = total  + (n.cant * n.price)
			});

		}

		$('#totalItems').text(items)
		$('#total').text('$ '+total+ ' MXN')
		
	}

	app.createProducts = function(){
		var productos = [],
		wrapper = $('.productosWrapper'),
		contenido = ''
        
       Comida.where("Disponible", "==", true).get().then(function(alimentos) {
var idd = 0;
alimentos.forEach(function(doc) {
idd ++;
        //console.log(doc.data().Nombre);
        var producto = {
            id : doc.id,
            img : 'img/prueba.png',
            name : doc.data().Nombre,
            price : doc.data().PrecioSencillo,
            desc : doc.data().Descripcion,
            stock : 4,
        };
        //console.log(producto);
        productos.push(producto);
 });
         }).then(function() {
		for(var i = 0; i < productos.length; i++){

			if(productos[i].stock > 0){

				contenido+= '<div class="coin-wrapper">'
				contenido+= '		<img src="'+productos[i].img+'" alt="'+productos[i].name+'">'
				contenido+= '		<span class="large-12 columns product-details">'
				contenido+= '			<h3>'+productos[i].name+' <span class="price">$ '+productos[i].price+' MXN</span></h3>'
				contenido+= '			<h3>Tenemos: <span class="stock">'+productos[i].stock+'</span></h3>'
				contenido+= '		</span>'
				contenido+= '	class="btn btn-primary"	<a class="large-12 columns btn submit ladda-button prod-'+productos[i].id+'" data-style="slide-right" onclick="app.addtoCart(\''+productos[i].id+'\');">AÒadir a la canasta</a>'
				contenido+= '		<div class="clearfix"></div>'
				contenido+= '</div>'

			}

		}

		//wrapper.html(contenido)

		localStorage.setItem('productos',JSON.stringify(productos))
 });
	}

	app.addtoCart = function(id){
		var l = Ladda.create( document.querySelector( '.prod-'+id ) );

		l.start();
		var productos = JSON.parse(localStorage.getItem('productos')),
		producto = _.find(productos,{ 'id' : id }),
		cant = 1
		if(cant <= producto.stock){
			if(undefined != producto){
				if(cant > 0){
					setTimeout(function(){
						var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
						app.searchProd(cart,producto.id,parseInt(cant),producto.name,producto.price,producto.img,producto.stock)
						l.stop();
                        $('#'+id).modal('hide');
					},2000)
				}else{
					alert('Solo se permiten cantidades mayores a cero')
				}
			}else{
				alert('Oops! algo malo ocurrio, intentalo de nuevo mas tarde')
			}
		}else{
			alert('No se pueden agregar mas de este producto')
		}

	}

	app.searchProd = function(cart,id,cant,name,price,img,available){
		//si le pasamos un valor negativo a la cantidad, se descuenta del carrito
		var curProd = _.find(cart.items, { 'id': id })

		if(undefined != curProd && curProd != null){
			//ya existe el producto, a√±adimos uno m√°s a su cantidad
			if(curProd.cant < available){
				curProd.cant = parseInt(curProd.cant + cant)
			}else{
				alert('No se pueden agregar mas de este producto')
			}
			
		}else{
			//sino existe lo agregamos al carrito
			var prod = {
				id : id,
				cant : cant,
				name : name,
				price : price,
				img : img,
				available : available
			}
            
			cart.items.push(prod)
			
		}
		localStorage.setItem('cart',JSON.stringify(cart))
		app.init()
		app.getProducts()
		app.updatePayForm()
	}

	app.getProducts = function(){
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []},
		msg = '',
		wrapper = $('#cartitemssss'),
		total = 0
		wrapper.html('')

		if(undefined == cart || null == cart || cart == '' || cart.items.length == 0){
			wrapper.html('<li>Tu canasta esta vacia</li>');
			$('.cart').css('left','-400%')
		}else{
			var items = '';
			_.forEach(cart.items, function(n, key) {
			   total = total  + (n.cant * n.price)
               var preciocom = n.cant * n.price
			   items += '<tr><td>'
			   items += '<img src="'+n.img+'" height="42" width="42" /></td>'
			   items += '<td><h3 class="title">'+n.name+'<br></td><td>por implementar</td><td><span class="price">$'+n.price+' mxn</span></td><td><span class="price">'+n.cant+'</span></td> <td>$' + preciocom + ' mxn</td> <td><a href="#" class="editon" onclick="app.updateItem(\''+n.id+'\','+n.available+')"><i class="fas fa-edit"></i></a> <a href="#" class="cerron" onclick="app.deleteProd(\''+n.id+'\')" ><i class="fas fa-times"></i></a></td><div class="clearfix"></div></h3>'
			   items += '</td></tr>'
			});

			//agregar el total al carrito
			items += '<li id="total">Total : $ '+total+' MXN <div id="submitForm"></div></li>'
			wrapper.html(items)
			$('.cart').css('left','-500%')
		}
	}

	app.updateItem = function(id,available){
		//resta uno a la cantidad del carrito de compras
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ,
        curProd = _.find(cart.items, { 'id': id })
			//actualizar el carrito
			curProd.cant = curProd.cant - 1;
			//validar que la cantidad no sea menor a 0
			if(curProd.cant > 0){
				localStorage.setItem('cart',JSON.stringify(cart))
				app.init()
				app.getProducts()
				app.updatePayForm()
			}else{
				app.deleteProd(id,true)
			}
	}

	app.delete = function(id){
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
		
        var curProd = _.find(cart.items, { 'id': id })
		_.remove(cart.items, curProd);
		localStorage.setItem('cart',JSON.stringify(cart))
		app.init()
		app.getProducts()
		app.updatePayForm()
	}

    app.deleteAll = function(){
        var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
        _.forEach(cart.items, function(n, key) {
	        app.deleteProd(n.id,true);
		});
    }

	app.deleteProd = function(id,remove){

		if(undefined != id){
			if(remove == true){
				app.delete(id)
			}else{
				var conf = confirm('øDeseas eliminar este producto?')
				if(conf){
					app.delete(id)
				}
			}
			
		}
	}

	app.updatePayForm = function(){
		//eso va a generar un formulario dinamico para paypal
		//con los productos y sus precios
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
		var statics = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_cart"><input type="hidden" name="upload" value="1"><input type="hidden" name="currency_code" value="MXN" /><input type="hidden" name="business" value="'+business_paypal+'">',
		dinamic = '',
		wrapper = $('#submitForm')

		wrapper.html('')
		
		if(undefined != cart && null != cart && cart != ''){
			var i = 1;
			_.forEach(cart.items, function(prod, key) {
					dinamic += '<input type="hidden" name="item_name_'+i+'" value="'+prod.name+'">'
					dinamic += '<input type="hidden" name="amount_'+i+'" value="'+prod.price+'">'
					dinamic += '<input type="hidden" name="item_number_'+i+'" value="'+prod.id+'" />'
					dinamic += '<input type="hidden" name="quantity_'+i+'" value="'+prod.cant+'" />'
				i++;
			})

			statics += dinamic + '<button type="submit" class="btn btn-success">Proceder al Pago &nbsp;<i class="ion-chevron-right"></i></button></form>'

			wrapper.html(statics)
		}
	}

	$(document).ready(function(){
		app.init()
		app.getProducts()
		app.updatePayForm()
		app.createProducts()
	})

})(jQuery)