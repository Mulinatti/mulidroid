import React, { useState } from "react";
import { View } from "react-native";
import Text from "../components/ui/text";
import Button from "../components/ui/button";
import type IServico from "../interfaces/IServico";
import type IAjudante from "../interfaces/IAjudante";
import HomeOptions from "../components/home-options";
import Faturameto from "../components/faturamento";
import Diarias from "../components/diarias";
import ListaServicos from "../components/lista-servicos";
import ListaAjudantes from "../components/lista-ajudantes";

const servicos: IServico[] = [
	{
		id: "1",
		address: "Ilha de Cinnabar",
		neighborhood: "Kalos",
		value: 350,
		date: "23/10/2024",
	},
	{
		id: "2",
		address: "Ilha dos Macacos",
		neighborhood: "Unova",
		value: 450,
		date: "21/10/2024",
	},
	{
		id: "3",
		address: "Ilha de Viridian",
		neighborhood: "Kanto",
		value: 550,
		date: "27/10/2024",
	},
	{
		id: "4",
		address: "Resort de Batalha",
		neighborhood: "Sinnoh",
		value: 10000,
		date: "09/01/1993",
	},
	{
		id: "5",
		address: "Ilha de Cinnabar",
		neighborhood: "Kalos",
		value: 350,
		date: "23/10/2024",
	},
	{
		id: "6",
		address: "Ilha de Cinnabar",
		neighborhood: "Kalos",
		value: 350,
		date: "23/10/2024",
	},
];

const ajudantes: IAjudante[] = [
	{
		id: '1',
		alias: 'Alomomola',
		name: 'Alomomola da Silva',
		username: "-",
		password: "-",
		phoneNumber: '(55) 21 99999-9999',
		birthDate: '01/01/1988',
		driver: true
	},
	{
		id: '2',
		alias: 'Garbodor',
		name: 'Garbodor Sludge Bomb',
		username: "-",
		password: "-",
		phoneNumber: '(55) 21 91111-1111',
		birthDate: '21/03/1998',
		driver: true
	},
	{
		id: '3',
		alias: 'Girafarig',
		name: 'Girafarig Girafales',
		username: "-",
		password: "-",
		phoneNumber: '(55) 21 92222-2222',
		birthDate: '01/01/1988',
		driver: false
	},
	{
		id: '4',
		alias: 'Mewtwo',
		name: 'Mewtwo Meritocrático',
		username: "-",
		password: "-",
		phoneNumber: '(55) 21 93333-3333',
		birthDate: '17/08/1990',
		driver: false
	}
]

/**
 *
 * TODO: falta ainda colocar rolagem na lista de serviços
 */
const TelaHome = ({ deslogar }) => {
	const [listaServicos, setListaServicos] = useState<IServico[]>(servicos);
	const [listaAjudantes, setListaAjudantes] = useState(ajudantes);
	const [mostrarServicos, setMostrarServicos] = useState(true);

	return (
		<View className="w-full px-8 gap-4 h-screen mt-12">
			<Faturameto/>
			<Diarias/>
			<View className="flex-row justify-center gap-4 w-full">
				<Button
					className="bg-blue-500 w-[161px] p-3 rounded-md"
					onPress={() => setMostrarServicos(true)}
				>
					<Text className=" text-center text-white" weight="semiBold">
						Serviços
					</Text>
				</Button>
				<Button
					className="bg-blue-500 w-[161px] p-3 rounded-md"
					onPress={() => setMostrarServicos(false)}
				>
					<Text className=" text-center text-white" weight="semiBold">
						Ajudantes
					</Text>
				</Button>
			</View>
			<View className="max-h-[400px]">
				{mostrarServicos ? (
					<ListaServicos listaServicos={listaServicos}/>
				) : (
					<ListaAjudantes listaAjudantes={ajudantes}/>)
				}
				<HomeOptions deslogar={deslogar} />
			</View>
		</View>
	);
};

export default TelaHome;
