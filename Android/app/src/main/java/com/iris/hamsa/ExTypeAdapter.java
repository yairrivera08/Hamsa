package com.iris.hamsa;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.TextView;

import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ExTypeAdapter extends BaseExpandableListAdapter {

    Context context;
    List<String> grupos;
    HashMap<String,ArrayList<TiposPlatModel>> tipos;


    public ExTypeAdapter(Context ctx, List<String> grupos, HashMap<String,ArrayList<TiposPlatModel>> type){
        this.context = ctx;
        this.tipos = type;
        this.grupos=grupos;

    }

    @Override
    public int getGroupCount() {
        return grupos.size();
    }

    @Override
    public int getChildrenCount(int groupPosition) {
        return this.tipos.get(this.grupos.get(groupPosition)).size();
    }

    @Override
    public Object getGroup(int groupPosition) {
        return this.grupos.get(groupPosition);
    }

    @Override
    public Object getChild(int groupPosition, int childPosition) {
        return this.tipos.get(this.grupos.get(groupPosition)).get(childPosition).getDescripcion();
    }

    public Object getChildPrice(int groupPosition, int childPosition) {
        return this.tipos.get(this.grupos.get(groupPosition)).get(childPosition).getPrecio();
    }


    @Override
    public long getGroupId(int groupPosition) {
        return groupPosition;
    }

    @Override
    public long getChildId(int groupPosition, int childPosition) {
        return childPosition;
    }

    @Override
    public boolean hasStableIds() {
        return false;
    }

    @Override
    public View getGroupView(int groupPosition, boolean isExpanded, View convertView, ViewGroup parent) {
        String group = (String) getGroup(groupPosition);
        if(convertView == null){
            LayoutInflater layoutInflater = (LayoutInflater) this.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = layoutInflater.inflate(R.layout.list_group,null);
        }

        TextView textView = convertView.findViewById(R.id.list_parent);
        textView.setText(group);

        return convertView;
    }

    @Override
    public View getChildView(int groupPosition, int childPosition, boolean isLastChild, View convertView, ViewGroup parent) {

            String child = (String) getChild(groupPosition, childPosition);
            Log.d("EXTYPEADAPTER", "Nom tipo=>" + child);
            float price = (float) getChildPrice(groupPosition, childPosition);
            Log.d("EXTYPEADAPTER", "$$$ tipo=>" + price);
            if (convertView == null) {
                LayoutInflater layoutInflater = (LayoutInflater) this.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
                convertView = layoutInflater.inflate(R.layout.list_tipo, null);
            }
            TextView tipo = convertView.findViewById(R.id.child_tipo);
            tipo.setText(child);
            TextView precio = convertView.findViewById(R.id.child_precio);
            precio.setText("$" + price);

        return convertView;
    }

    @Override
    public boolean isChildSelectable(int groupPosition, int childPosition) {
        return true;
    }
}
