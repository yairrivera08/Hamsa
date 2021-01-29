package com.iris.hamsa;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

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
    int[] sampleImages = {R.drawable.image_1, R.drawable.image_2};
    private RecyclerView recyclerView;
    private ArrayList<CategoriasModel> imageModelArrayList;
    private CategoriasAdapter adapter;

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

        recyclerView = (RecyclerView) view.findViewById(R.id.RecyclerMenu);

        imageModelArrayList = llenaCategorias();
        adapter = new CategoriasAdapter(getActivity().getApplicationContext(), imageModelArrayList);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity().getApplicationContext(), LinearLayoutManager.HORIZONTAL, false));

        FirebaseManager fbm = new FirebaseManager();
        fbm.getAlimentos("Escom");

        return view;
    }

    ImageListener imageListener = new ImageListener() {
        @Override
        public void setImageForPosition(int position, ImageView imageView) {
            imageView.setImageResource(sampleImages[position]);
        }
    };

    private ArrayList<CategoriasModel> llenaCategorias(){
        ArrayList<CategoriasModel> list = new ArrayList<>();

        for(int i = 0; i < 7; i++){
            CategoriasModel categoriaM = new CategoriasModel();
            categoriaM.setNombre(myImageNameList[i]);
            categoriaM.setImage_drawable(myImageList[i]);
            list.add(categoriaM);
        }

        return list;
    }

}