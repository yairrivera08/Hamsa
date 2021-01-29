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
    private ArrayList<CategoriasModel> imageModelArrayList;

    public ProductosAdapter(Context ctx, ArrayList<CategoriasModel>imageModelArrayList){
        inflater = LayoutInflater.from(ctx);
        this.imageModelArrayList = imageModelArrayList;
    }

    @Override
    public ProductosAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View view = inflater.inflate(R.layout.recycler_menu, parent, false);
        MyViewHolder holder = new MyViewHolder(view);

        return holder;
    }

    @Override
    public void onBindViewHolder(ProductosAdapter.MyViewHolder holder, int position) {

        holder.catImage.setImageResource(imageModelArrayList.get(position).getImage_drawable());
        holder.catText.setText(imageModelArrayList.get(position).getNombre());
    }

    @Override
    public int getItemCount() {
        return imageModelArrayList.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder {

        TextView catText;
        ImageView catImage;

        public MyViewHolder(View itemView) {
            super(itemView);

            catText = (TextView) itemView.findViewById(R.id.catTxt);
            catImage = (ImageView) itemView.findViewById(R.id.catImg);
        }
    }
}
