import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import fornos from "../Dados/fornos.json"; // ajuste o caminho conforme sua pasta "dados"

export default function QRCodeScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Pedir permissão para usar a câmera
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    // Supondo que o QR code contenha o id do forno (ex: "forno1")
    const fornoEncontrado = fornos.find((f) => f.id === data);

    if (fornoEncontrado) {
      // Navega de volta e envia os dados do forno
      navigation.navigate("AbrirChamado", {
        modelo: fornoEncontrado.modelo,
        endereco: fornoEncontrado.endereco,
      });
    } else {
      Alert.alert("Erro", "Forno não encontrado no banco de dados!");
      setScanned(false); // Libera para escanear de novo
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Text>Solicitando permissão para acessar a câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>Sem acesso à câmera.</Text>
        <Button
          title="Tentar novamente"
          onPress={async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <View style={styles.buttonContainer}>
          <Button title="Escanear novamente" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
