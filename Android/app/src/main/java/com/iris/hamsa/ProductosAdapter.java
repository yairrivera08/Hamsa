package com.iris.hamsa;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class ProductosAdapter extends RecyclerView.Adapter<ProductosAdapter.MyViewHolder> {

    private LayoutInflater inflater;
    private ArrayList<PlatillosModel> platillosArray;

    public ProductosAdapter(Context ctx, ArrayList<PlatillosModel>platillosArray){
        inflater = LayoutInflater.from(ctx);
        this.platillosArray = platillosArray;
    }

    @Override
    public ProductosAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View view = inflater.inflate(R.layout.recyclercomida, parent, false);
        MyViewHolder holder = new MyViewHolder(view);

        return holder;
    }

    @Override
    public void onBindViewHolder(ProductosAdapter.MyViewHolder holder, int position) {
        holder.nombrePlatillo.setText(platillosArray.get(position).getNombre());
        holder.descripcion.setText(platillosArray.get(position).getDescripcion());
        holder.precio.setText(String.valueOf(platillosArray.get(position).getTipos().get(0).getPrecio()));
    }

    @Override
    public int getItemCount() {
        return platillosArray.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder {

        TextView nombrePlatillo;
        TextView descripcion;
        TextView precio;
        //ImageView catImage;

        public MyViewHolder(View itemView) {
            super(itemView);

            nombrePlatillo = (TextView) itemView.findViewById(R.id.nombrePlatillo);
            descripcion = (TextView) itemView.findViewById(R.id.descripcion);
            precio = (TextView) itemView.findViewById(R.id.precio);
            //catImage = (ImageView) itemView.findViewById(R.id.catImg);
        }
    }
}
