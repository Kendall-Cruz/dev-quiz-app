import LogoXl from "@/components/LogoXl";
import ModalInfo from "@/components/ModalInfo";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSessionContext } from "../../context/SessionContext";
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { authStyles as styles } from '../../assets/styles/AuthStyles';

const Login = () => {
    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
    });

    const { login, clearError, user, error , clearMessage } = useSessionContext()

    const [showPassword, setShowPassword] = useState(false);

    const [showErrorModal, setShowErrorModal] = useState(false);


    useEffect(() => {
        if (error) {
            setShowErrorModal(true);
        }
    }, [error]);

    useEffect(() => {
        clearMessage();
    }, []);

    const closeErrorModal = () => {
        setShowErrorModal(false);
        clearError();
    }

    const onSubmit = async (data: any) => {

        const result = await login(data.email, data.password);

        console.log("Resultado del login", result)
        if (result) {
            router.replace('/(tabs)')
        }
    }

    return (

        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <LogoXl />
            <ScrollView>
                {/* Form */}
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Iniciar Sesión</Text>

                    {/* Correo */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Correo Electrónico</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                            <Controller
                                control={control}
                                rules={{
                                    required: 'El correo es requerido',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Formato de correo inválido',
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.textInput}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="correo@ejemplo.com"
                                        placeholderTextColor="#999"
                                        keyboardType="email-address"
                                        autoCapitalize="none"

                                    />
                                )}
                                name="email"
                            />
                        </View>
                        {errors.email && (
                            <Text style={styles.errorText}>{errors.email.message}</Text>
                        )}
                    </View>

                    {/* Contraseña */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Contraseña</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                            <Controller
                                control={control}
                                rules={{
                                    required: 'La contraseña es requerida',
                                    minLength: {
                                        value: 4,
                                        message: 'La contraseña debe tener al menos 8 caracteres',
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.textInput}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Contraseña"
                                        placeholderTextColor="#999"
                                        secureTextEntry={!showPassword}
                                    />
                                )}
                                name="password"
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.password && (
                            <Text style={styles.errorText}>{errors.password.message}</Text>
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => { router.push('/(auth)/Register') }} style={styles.newAccountContainer}>
                        <Text style={styles.newAccountText}>No tienes cuenta aún? Crear cuenta</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ModalInfo
                visible={showErrorModal}
                onClose={closeErrorModal}
                title="Error de Autenticación"
                message={error || 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.'}
                buttons={[
                    { text: 'Entendido', color: 'blue', onPress: closeErrorModal }
                ]}
                icon={{ name: "alert-circle", color: 'red' }}
            />
        </SafeAreaView>
    );
}


export default Login
