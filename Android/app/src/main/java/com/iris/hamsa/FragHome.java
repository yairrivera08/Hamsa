package com.iris.hamsa;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.Toast;

import com.synnapps.carouselview.CarouselView;
import com.synnapps.carouselview.ImageListener;

import java.util.ArrayList;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link FragHome#newInstance} factory method to
 * create an instance of this fragment.
 */
public class FragHome extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    CarouselView carouselView;
    int[] sampleImages = {R.drawable.carr1, R.drawable.carr2,R.drawable.carr3,R.drawable.carr4};
    private RecyclerView categoriasRecyclerView;
    private ArrayList<CategoriasModel> categoriasArrayList = new ArrayList<CategoriasModel>();
    private ArrayList<PlatillosModel> platillos = new ArrayList<PlatillosModel>();
    private ArrayList<PlatillosModel> platillosDisponibles = new ArrayList<PlatillosModel>();
    private ArrayList<EscuelaModel> escuelas = new ArrayList<EscuelaModel>();
    private CategoriasAdapter categoriasAdapter;
    private RecyclerView platillosRecyclerView;
    private ProductosAdapter platillosAdapter;
    private FirebaseManager fbm = new FirebaseManager();
    private View.OnClickListener onPlatilloClickListener = v -> {

        RecyclerView.ViewHolder viewHolder = (RecyclerView.ViewHolder) v.getTag();
        int position = viewHolder.getAdapterPosition();
        PlatillosModel plat = platillosDisponibles.get(position);
        Toast.makeText(getActivity().getApplicationContext(),"Platillo clickeado =>"+ plat.getNombre(),Toast.LENGTH_SHORT).show();
        Intent intentDetalle = new Intent(getActivity(),DetallePlatillo.class);
        intentDetalle.putExtra("Platillo",plat);
        //Log.d("INTENT A DETALLE","Platillo =>>"+plat.getNombre()+":"+plat.getDescripcion());
        startActivity(intentDetalle);
    };


    private int[] myImageList = new int[]{R.drawable.image_1, R.drawable.image_2,R.drawable.image_1, R.drawable.image_2,R.drawable.image_1, R.drawable.image_2,R.drawable.image_1};
    private String[] myImageNameList = new String[]{"Apple","Mango" ,"Strawberry","Pineapple","Orange","Blueberry","Watermelon"};

    public FragHome() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment FragHome.
     */
    // TODO: Rename and change types and number of parameters
    public static FragHome newInstance(String param1, String param2) {
        FragHome fragment = new FragHome();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        View view = inflater.inflate(R.layout.fragment_frag_home, container, false);

        carouselView = (CarouselView) view.findViewById(R.id.galeria);
        carouselView.setPageCount(sampleImages.length);
        carouselView.setImageListener(imageListener);

        categoriasRecyclerView = (RecyclerView) view.findViewById(R.id.RecyclerMenu);
        platillosRecyclerView = (RecyclerView) view.findViewById(R.id.RecyclerPlatillos);

        escuelas = (ArrayList<EscuelaModel>) getArguments().getSerializable("Escuelas");
        /*for(int i=0;i<escuelas.size();i++){
            Log.d("FRAGMENT", escuelas.get(0).getNombreCompleto());
        }*/
        categoriasArrayList =  escuelas.get(0).getCategorias();
        categoriasAdapter = new CategoriasAdapter(getActivity().getApplicationContext(), categoriasArrayList);
        categoriasRecyclerView.setLayoutManager(new LinearLayoutManager(getActivity().getApplicationContext(), LinearLayoutManager.HORIZONTAL, false));
        categoriasRecyclerView.setAdapter(categoriasAdapter);

        platillos = (ArrayList<PlatillosModel>) getArguments().getSerializable("Platillos");
        for(int i=0;i<platillos.size();i++) {
            //Log.d("FRAGMENT", platillos.get(0).getId());
            if(platillos.get(i).isDisponible()){
                platillosDisponibles.add(platillos.get(i));
            }
        }
        platillosAdapter = new ProductosAdapter(getActivity().getApplicationContext(), platillosDisponibles);

        platillosRecyclerView.setLayoutManager(new LinearLayoutManager(getActivity().getApplicationContext(), LinearLayoutManager.VERTICAL, false));
        platillosRecyclerView.setAdapter(platillosAdapter);
        platillosAdapter.setOnItemClickListener(onPlatilloClickListener);

        return view;
    }

    ImageListener imageListener = new ImageListener() {
        @Override
        public void setImageForPosition(int position, ImageView imageView) {
            imageView.setImageResource(sampleImages[position]);
        }
    };

}