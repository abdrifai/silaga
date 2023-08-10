import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  value: CurrentASNState;
};

type CurrentASNState = {
  pegawaiId: string;
  nip: string;
  nama: string;
  gol: string;
  pangkat: string;
  jabatan: string;
  unor: string;
};

const initialState: { value: CurrentASNState } = {
  value: {
    pegawaiId: "",
    nip: "",
    nama: "",
    gol: "",
    pangkat: "",
    jabatan: "",
    unor: "",
  },
};

const currentAsn = createSlice({
  name: "currentAsn",
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
    setCurrentASN: (state, action: PayloadAction<CurrentASNState>) => {
      state.value = {
        pegawaiId: action.payload.pegawaiId,
        nip: action.payload.nip,
        nama: action.payload.nama,
        gol: action.payload.gol,
        pangkat: action.payload.pangkat,
        jabatan: action.payload.jabatan,
        unor: action.payload.unor,
      };
    },
  },
});

export const { setCurrentASN } = currentAsn.actions;
export default currentAsn.reducer;
