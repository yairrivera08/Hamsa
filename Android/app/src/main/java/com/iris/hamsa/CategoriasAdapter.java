package com.iris.hamsa;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class CategoriasAdapter extends RecyclerView.Adapter<CategoriasAdapter.MyViewHolder> {

    private LayoutInflater inflater;
    private ArrayList<CategoriasModel> imageModelArrayList;

    public CategoriasAdapter(Context ctx, ArrayList<CategoriasModel>imageModelArrayList){
        inflater = LayoutInflater.from(ctx);
        this.imageModelArrayList = imageModelArrayList;
    }

    @Override
    public CategoriasAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View view = inflater.inflate(R.layout.recycler_menu, parent, false);
        MyViewHolder holder = new MyViewHolder(view);

        return holder;
    }

    @Override
    public void onBindViewHolder(CategoriasAdapter.MyViewHolder holder, int position) {

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
