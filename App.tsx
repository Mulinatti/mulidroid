import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import "./global.css";
import Text from "./src/components/ui/text";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  SofiaSans_100Thin,
  SofiaSans_200ExtraLight,
  SofiaSans_300Light,
  SofiaSans_400Regular,
  SofiaSans_500Medium,
  SofiaSans_600SemiBold,
  SofiaSans_700Bold,
  SofiaSans_800ExtraBold,
  SofiaSans_900Black,
} from "@expo-google-fonts/sofia-sans";
import { useEffect } from "react";
import Button from "./src/components/ui/button";
import AjudanteForm from "./src/screens/ajudante-form";
import ServicoForm from './src/screens/servico-form';
import TelaPerfil from './src/screens/perfil';
import TelaHome from './src/screens/home';
import Login from "./src/screens/login";
import VeiculoForm from "./src/screens/veiculo-form";
import Servico from "./src/screens/servico";
import Home from "./src/screens/home";

/**
 * TODO: implementar a navegação
 */
export default function App() {

    const [loaded, error] = useFonts({
      SofiaSans_100Thin,
      SofiaSans_200ExtraLight,
      SofiaSans_300Light,
      SofiaSans_400Regular,
      SofiaSans_500Medium,
      SofiaSans_600SemiBold,
      SofiaSans_700Bold,
      SofiaSans_800ExtraBold,
      SofiaSans_900Black,
    });

    useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]);
  
    if (!loaded && !error) {
      return null;
    }

  return (
    <ScrollView contentContainerClassName="items-center">
      <Home />
    </ScrollView>
  );
}
