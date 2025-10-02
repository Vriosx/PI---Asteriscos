import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import fornos from "../Dados/fornos.json";

export default function QRCodeScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  // Efeito para solicitar permissão
  useEffect(() => {
    const askForPermission = async () => {
      try {
        if (!permission?.granted) {
          await requestPermission();
        }
      } catch (error) {
        console.error("Erro ao solicitar permissão:", error);
        Alert.alert("Erro", "Não foi possível acessar a câmera");
      }
    };

    askForPermission();
  }, [permission]); // Adicionei permission como dependência

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const handleBarCodeScanned = ({ data }) => {
    if (scanned || !data) return;

    setScanned(true);

    try {
      console.log("QR Code lido:", data);
      console.log("QR Code limpo:", data.trim());

      // Limpa espaços e faz busca case insensitive
      const idLimpo = data.trim().toUpperCase();

      // Busca o forno pelo ID (mais tolerante)
      const fornoEncontrado = fornos.find((f) =>
        f.id.trim().toUpperCase() === idLimpo
      );

      console.log("Forno encontrado:", fornoEncontrado);

      if (fornoEncontrado) {
        setTimeout(() => {
          navigation.navigate("HomeTabsCliente", {
            screen: "AbrirChamado",
            params: {
              modelo: fornoEncontrado.modelo,
              endereco: fornoEncontrado.endereco,
              id: fornoEncontrado.id,
            }
          });
        }, 500);
      } else {
        console.log("IDs disponíveis:", fornos.map(f => f.id));
        Alert.alert(
          "QR Code não reconhecido",
          `Forno com ID "${data}" não está cadastrado. IDs disponíveis: ${fornos.map(f => f.id).join(', ')}`,
          [
            {
              text: "Escanear Novamente",
              onPress: () => setScanned(false)
            }
          ]
        );
      }
    } catch (error) {
      console.error("Erro ao processar QR Code:", error);
      Alert.alert(
        "Erro de leitura",
        "Falha ao processar QR Code. Tente novamente.",
        [{ text: "OK", onPress: () => setScanned(false) }]
      );
    }
  };
  
  const handleScanAgain = () => {
    setScanned(false);
  };

  // Estados de carregamento e permissão
  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Solicitando permissão...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Permissão de câmera necessária</Text>
        <Text style={styles.subText}>
          Precisamos da câmera para escanear QR Codes dos fornos
        </Text>
        <Button title="Conceder Permissão" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        onCameraReady={handleCameraReady}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
      />

      {/* Overlay para ajudar no scan */}
      <View style={styles.overlay}>
        <View style={styles.scanFrame}>
          <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} />
        </View>
        <Text style={styles.scanText}>
          Posicione o QR Code dentro do quadro
        </Text>
      </View>

      {scanned && (
        <View style={styles.buttonContainer}>
          <Button
            title="Escanear Novamente"
            onPress={handleScanAgain}
            color="#007AFF"
          />
        </View>
      )}

      {!cameraReady && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Preparando câmera...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
  subText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    lineHeight: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    paddingVertical: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "transparent",
    borderRadius: 10,
    position: "relative",
  },
  // Cantos do frame de scan
  cornerTL: {
    position: "absolute",
    top: -2,
    left: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#007AFF",
  },
  cornerTR: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: "#007AFF",
  },
  cornerBL: {
    position: "absolute",
    bottom: -2,
    left: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#007AFF",
  },
  cornerBR: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#007AFF",
  },
  scanText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 12,
    borderRadius: 8,
    fontWeight: "500",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});