import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store";

//Hooks приложения
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); //Dispatch приложения
export const useAppSelector = useSelector.withTypes<RootState>(); //Selector приложения
