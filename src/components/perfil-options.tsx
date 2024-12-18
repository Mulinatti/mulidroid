import { Alert, Modal, View } from "react-native";
import Button from "./ui/button";
import { Lock, LogOut, User } from "lucide-react-native";
import Text from "./ui/text";
import { useContext, useState } from "react";
import Input from "./ui/input";
import UserContext from "../hooks/userContext";
import useNavigation from "../hooks/useNavigation";
import { ServicoAjudanteContext } from "../contexts/ServicoAjudanteContext";
import http from "../http/http";

const PerfilOptions = () => {

  const [mostrarModalSenha, setMostrarModalSenha] = useState(false);
  const [mostrarModalNomeUsuario, setMostrarModalNomeUsuario] = useState(false);

  const { navigate } = useNavigation().navigator;

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setLogado, setAdminAqui, employeeId } = useContext(UserContext);

  const mudarUsuario = async () => {
    if (username !== "")
      await http.put(`user/${employeeId}`, {
        username
      }).then(() => {
        navigate("Login");
      })
  }

  const mudarSenha = async () => {
    if (password !== "")
      await http.put(`user/${employeeId}`, {
        password
      }).then(() => {
        setAdminAqui(false)
        setLogado(false);
        navigate("Login");
      })
  }

  return (
    <View className="flex-row justify-center gap-2 mb-4">
      <Button
        className="rounded-full mt-4 items-center"
        onPress={() => setMostrarModalNomeUsuario(true)}
      >
        <View className="bg-blue-500 shadow-sm items-center justify-center p-4 rounded-full">
          <User color="#fff" />
        </View>
        <Text className="mt-1 text-center w-24 text-black" weight="semiBold">
          Alterar usuário
        </Text>
      </Button>
      <Button
        className="items-center rounded-md mt-4"
        onPress={() => setMostrarModalSenha(true)}
      >
        <View className="bg-blue-500 shadow-sm items-center justify-center p-4 rounded-full">
          <Lock color="#fff" />
        </View>
        <Text className="mt-1 text-center w-24 text-black" weight="semiBold">
          Alterar senha
        </Text>
      </Button>
      <Button
        className="rounded-md mt-4 items-center"
        onPress={() => { setLogado(false); setAdminAqui(false); }}
      >
        <View className="bg-red-500 shadow-sm items-center justify-center p-4 rounded-full">
          <LogOut color="#fff" />
        </View>
        <Text className="mt-1 text-center w-24 text-black" weight="semiBold">
          Sair
        </Text>
      </Button>

      <Modal
        testID="modal-senha"
        animationType="slide"
        visible={mostrarModalSenha}
        onRequestClose={() => {
          setMostrarModalSenha(!mostrarModalSenha);
        }}
      >
        <View className="h-full mx-6 justify-center gap-5">
          <Input label="Nova senha" onChangeText={setPassword} />
          <View>
            <Button
              className="bg-red-500 p-4 rounded-md mt-4"
              onPress={() => setMostrarModalSenha(false)}
            >
              <Text className="text-lg text-center text-white">Cancelar</Text>
            </Button>
            <Button
              className="bg-blue-500 p-4 rounded-md mt-4"
              onPress={() => {
                mudarSenha();
                setMostrarModalSenha(false);
              }}
            >
              <Text className="text-lg text-center text-white">Salvar</Text>
            </Button>
          </View>
        </View>
      </Modal>

      <Modal
        testID="modal-nome-usuario"
        animationType="slide"
        visible={mostrarModalNomeUsuario}
        onRequestClose={() => {
          setMostrarModalSenha(!mostrarModalNomeUsuario);
        }}
      >
        <View className="h-full mx-6 justify-center gap-5">
          <Input label="Mudar nome de usuário" onChangeText={setUsername} />
          <View>
            <Button
              className="bg-red-500 p-4 rounded-md mt-4"
              onPress={() => setMostrarModalNomeUsuario(false)}
            >
              <Text className="text-lg text-center text-white">Cancelar</Text>
            </Button>
            <Button
              className="bg-blue-500 p-4 rounded-md mt-4"
              onPress={() => {
                mudarUsuario();
                setMostrarModalNomeUsuario(false);
              }}
            >
              <Text className="text-lg text-center text-white">Salvar</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default PerfilOptions;