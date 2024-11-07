import React, { useState } from "react";
import { ScrollView, View, Alert, Modal } from "react-native";
import Text from "../components/ui/text";
import Button from "../components/ui/button";
import { Calendar } from "lucide-react-native";
import Divider from "../components/ui/divider";
import CardAjudante from "../components/card-ajudante";
import type IAjudante from "../interfaces/IAjudante";
import useNavigation from "../components/hooks/useNavigation";
import { MultiSelect } from "react-native-element-dropdown";
import Input from "../components/ui/input";
import styles from "../components/ui/styles";
import dayjs from "dayjs";
import { fontVariants } from "../utils/fontVariants";
import DateTimePicker from "react-native-ui-datepicker";

const ajudantes: IAjudante[] = [
	{
		id: '1',
		alias: "Alomomola",
		name: "Zé Carambola",
		phoneNumber: "21999999999",
		birthDate: "04/04/2004",
		driver: false,
	},
	{
		id: '2',
		alias: "Garbodor",
		name: "Anderson Linhares",
		phoneNumber: "2177377773",
		birthDate: "26/06/2006",
		driver: false,
	},
	{
		id: '3',
		alias: "Alomomola",
		name: "Zé Carambola",
		phoneNumber: "21999999991",
		birthDate: "04/04/2004",
		driver: false,
	},
	{
		id: '4',
		alias: "Garbodor",
		name: "Anderson Linhares",
		phoneNumber: "21777117777",
		birthDate: "26/06/2006",
		driver: false,
	},
	{
		id: '5',
		alias: "Alomomola",
		name: "Zé Carambola",
		phoneNumber: "21996999999",
		birthDate: "04/04/2004",
		driver: false,
	},
	{
		id: '6',
		alias: "Garbodor",
		name: "Anderson Linhares",
		phoneNumber: "21775777777",
		birthDate: "26/06/2006",
		driver: false,
	},
	{
		id: '7',
		alias: "Alomomola",
		name: "Zé Carambola",
		phoneNumber: "21999299999",
		birthDate: "04/04/2004",
		driver: false,
	},
	{
		id: '8',
		alias: "Garbodor",
		name: "Anderson Linhares",
		phoneNumber: "21737777777",
		birthDate: "26/06/2006",
		driver: false,
	},
];

// Dados para o dropdown
const dados = [
	{nome: "Alomomola"},
	{nome: "Garbodor"},
	{nome: "Girafarig"},
	{nome: "Snorlax"},
	{nome: "Armaldo"},
];

/**
 * 
 * TODO: na modal de edição, alto preencher com os dados salvos previamente.
 */
const Servico = () => {
	const [expandAddress, setExpandAdress] = useState(1);
	const [listaAjudantes, setListaAjudantes] = useState(ajudantes);
	const [modalConfirmacaoPagamento, setModalConfirmacaoPagamento] = useState(false);
	const [modalEditarServico, setModalEditarServico] = useState(false);
	const [endereco, setEndereco] = useState("");
	const [bairro, setBairro] = useState("");
	const [valor, setValor] = useState("");
	const [veiculo, setVeiculo] = useState("");
	const [data, setData] = useState(dayjs());
	const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
	const [ajudantesSelecionados, setAjudantesSelecionados] = useState(null);
	const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
	const { navigate } = useNavigation().navigator;

	return (
		<View className="px-8 w-full">
			<View>
				<Button
					onPress={() =>
						expandAddress === 1 ? setExpandAdress(2) : setExpandAdress(1)
					}
				>
					<Text
						className="text-3xl overflow-ellipsis max-w-[320px]"
						lines={expandAddress}
						weight="black"
					>
						São José do Vale do Rio Preto
					</Text>
				</Button>
				<Text className="text-xl">Cascadura</Text>
				<View className="flex-row gap-1 mt-4">
					<Calendar size={15} color={"#202020"} />
					<Text className="text-black/50">26/10/2024</Text>
				</View>
			</View>
			<Divider margin={6} />
			<Text className="text-xl mb-3" weight="bold">
				Ajudantes
			</Text>
			<View>
				<ScrollView className="h-[352px]">
					{listaAjudantes.map((ajudante) => (
						<CardAjudante
							key={ajudante.phoneNumber}
							ajudante={ajudante}
							onPress={() => navigate("Ajudante")}
							onLongPress={() => setModalConfirmacaoPagamento(true)}
						/>
					))}
				</ScrollView>
				<Button className="bg-blue-500 p-5 mt-2 rounded-md" onPress={() => setModalEditarServico(true)}>
					<Text className="text-center text-white text-lg" weight="semiBold">
						Editar
					</Text>
				</Button>
			</View>
			<Modal
				testID="modal-confirmacao-final"
				animationType="slide"
				visible={modalConfirmacaoPagamento}
				onRequestClose={() => {
					Alert.alert("Cancelado!");
					setModalConfirmacaoPagamento(false);
				}}
			>
				<View className="gap-5 h-full p-8 justify-center">
					<Text className="text-xl" weight="bold">Deseja mesmo efetuar o pagamento?</Text>
					<Button className="bg-red-500 p-4 rounded-md mt-4" onPress={() => setModalConfirmacaoPagamento(!modalConfirmacaoPagamento)}>
						<Text className="text-xl text-center text-white" weight="semiBold">Cancelar</Text>
					</Button>
					<Button className="bg-green-500 p-4 rounded-md mt-4" onPress={() => Alert.alert("Aqui salva no banco de dados.")}>
						<Text className="text-xl text-center text-white" weight="semiBold">Sim, tenho certeza!</Text>
					</Button>
				</View>
			</Modal>
			<Modal
				testID="modal-editar-servico"
				animationType="slide"
				visible={modalEditarServico}
				onRequestClose={() => {
					Alert.alert("Cancelado!");
					setModalEditarServico(false);
				}}
			>
				<ScrollView className="w-full mt-10" contentContainerClassName="gap-5 px-8 mb-10 pb-5">
					<Text className="text-left text-3xl" weight="black">Editar informações</Text>
					<Input label="Endereço" onChangeText={setEndereco} value={endereco} />
					<Input label="Bairro" onChangeText={setBairro} value={bairro} />
					<Input label="Valor" onChangeText={setValor} value={valor} />
					<Input label="Veículo" onChangeText={setVeiculo} value={veiculo} />
					<View>
						<Text className="mb-2" weight="medium">
							Data do serviço
						</Text>
						<Button
							className="placeholder:text-black/20 rounded-md border border-black/10 w-full py-4 px-4 text-xl"
							testId="botao-data"
							onPress={() => setMostrarDatePicker(true)}
						>
							<Text className="text-xl text-black" weight="light">
								{data.format("DD/MM/YYYY")}
							</Text>
						</Button>
					</View>
					<View>
						<Text className="mb-2" weight="medium">
							Selecionar ajudantes
						</Text>
						<MultiSelect
							dropdownPosition="top"
							style={styles.dropdown}
							fontFamily={fontVariants.light}
							containerStyle={styles.container}
							search
							data={dados}
							labelField="nome"
							valueField="nome"
							placeholder="Selecione"
							searchPlaceholder="Procurar..."
							value={ajudantesSelecionados}
							onChange={(item) => {
								setAjudantesSelecionados(item);
							}}
						/>
					</View>
					<Button
						className="bg-blue-500 p-4 rounded-md mt-4"
						onPress={() => {
								if (endereco == "" || bairro == "" || valor == "" || veiculo == "" || data == null || ajudantesSelecionados == null) {
									Alert.alert("Você deve preencher todos os campos!");
								} else {
									setMostrarConfirmacao(true);
								}
							}
						}
					>
						<Text className="text-xl text-center text-white" weight="semiBold">
							Salvar
						</Text>
					</Button>
				</ScrollView>
			</Modal>
			<Modal
					testID="modal-data"
					animationType="slide"
					transparent={false}
					visible={mostrarDatePicker}
					onRequestClose={() => {
						Alert.alert("Data salva!");
						setMostrarDatePicker(!mostrarDatePicker);
					}}
				>
					<View className="mt-10 p-6">
						<DateTimePicker
							calendarTextStyle={{ fontFamily: fontVariants.regular }}
							selectedTextStyle={{ fontFamily: fontVariants.bold }}
							minDate={dayjs()}
							headerTextStyle={{ textTransform: "capitalize" }}
							headerButtonStyle={{
								backgroundColor: "#3b82f6",
								borderRadius: 100,
								padding: 6,
							}}
							headerButtonColor="#fff"
							selectedItemColor="#3b82f6"
							locale={dayjs.locale("pt-br")}
							mode="single"
							date={data}
							onChange={(params) => setData(dayjs(params.date))}
						/>
						<Button
							className="bg-blue-500 p-4 rounded-md mt-4"
							onPress={() => {
								setMostrarDatePicker(!mostrarDatePicker);
							}}
						>
							<Text className="text-lg text-center text-white">Selecionar</Text>
						</Button>
					</View>
				</Modal>
				<Modal
					testID="modal-confirmacao"
					animationType="slide"
					visible={mostrarConfirmacao}
					onRequestClose={() => {
						Alert.alert("Cancelado!");
						setMostrarConfirmacao(false);
					}}
				>
					<View className="mt-10 p-6 gap-5">
						<Text className="text-xl text-center" weight="extraBold">
							Tem certeza do que está fazendo?
						</Text>
						<Text className="text-xl" weight="extraBold">
							-- Dados entrados
						</Text>
						<View className="bg-slate-200 p-5 rounded-md">
							<Text className="text-xl" weight="bold">
								Endereço:
							</Text>
							<Text>{endereco}</Text>
							<Text className="text-xl" weight="bold">
								Bairro:
							</Text>
							<Text>{bairro}</Text>
							<Text className="text-xl" weight="bold">
								Valor:
							</Text>
							<Text>{valor}</Text>
							<Text className="text-xl" weight="bold">
								Veículo:
							</Text>
							<Text>{veiculo}</Text>
							<Text className="text-xl" weight="bold">
								Data:
							</Text>
							<Text>{data.format("DD/MM/YYYY")}</Text>
							<Text className="text-xl" weight="bold">
								Ajudantes:
							</Text>
							<Text>
								{ajudantesSelecionados? ajudantesSelecionados.join(", ") : null}
							</Text>
						</View>
						<View className="gap-2">
							<Button
								className="bg-red-500 p-4 rounded-md mt-4"
								onPress={() => setMostrarConfirmacao(!mostrarConfirmacao)}
							>
								<Text className="text-xl text-center text-white">Cancelar</Text>
							</Button>
							<Button
								className="bg-blue-500 p-4 rounded-md mt-4"
								onPress={() => Alert.alert("Salvo!")}
							>
								<Text className="text-xl text-center text-white">
									Tenho absoluta certeza!
								</Text>
							</Button>
						</View>
					</View>
				</Modal>
		</View>
	);
};

export default Servico;
