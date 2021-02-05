package com.iris.hamsa;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.google.firebase.storage.StorageReference;

import java.util.ArrayList;

public class ProductosAdapter extends RecyclerView.Adapter<ProductosAdapter.MyViewHolder> {

    private LayoutInflater inflater;
    private ArrayList<PlatillosModel> platillosArray;
    private Context ctxadapt;
    private FirebaseManager fbm = new FirebaseManager();
    private View.OnClickListener mOnItemClickListener;

    public ProductosAdapter(Context ctx, ArrayList<PlatillosModel>platillosArray){
        inflater = LayoutInflater.from(ctx);
        ctxadapt=ctx;
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
        if(platillosArray.get(position).getImgUrl().isEmpty()) {
            holder.imagenPlatillo.setImageResource(R.drawable.noimage);
        }else{
            StorageReference sr = fbm.getStorage().getReferenceFromUrl("gs://textualmovil.appspot.com/" + platillosArray.get(position).getImgUrl());
            Log.d("INTENTO DE IMAGEN",platillosArray.get(position).getImgUrl());
            GlideApp.with(ctxadapt).load(sr).diskCacheStrategy(DiskCacheStrategy.ALL).into(holder.imagenPlatillo);
        }
    }

    public void setOnItemClickListener(View.OnClickListener itemClickListener) {
        this.mOnItemClickListener = itemClickListener;
    }

    @Override
    public int getItemCount() {
        return platillosArray.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder {

        TextView nombrePlatillo;
        TextView descripcion;
        TextView precio;
        ImageView imagenPlatillo;

        public MyViewHolder(View itemView) {
            super(itemView);

            nombrePlatillo = (TextView) itemView.findViewById(R.id.nombrePlatillo);
            descripcion = (TextView) itemView.findViewById(R.id.descripcion);
            precio = (TextView) itemView.findViewById(R.id.precio);
            imagenPlatillo = (ImageView) itemView.findViewById(R.id.platilloImg);
            itemView.setTag(this);
            itemView.setOnClickListener(mOnItemClickListener);
        }
    }
}
