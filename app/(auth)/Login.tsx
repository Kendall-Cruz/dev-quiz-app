import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { SafeAreaView, StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useSessionContext } from "../../context/SessionContext";
import { router } from "expo-router";
import { HelperText } from "react-native-paper";
import ErrorModal from "@/components/ErrorModal";
import { ScrollView } from "react-native";

const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });


    const { login, user, error } = useSessionContext()

    const [showPassword, setShowPassword] = useState(false);

    const [showErrorModal, setShowErrorModal] = useState(false);

    // Mostrar modal cuando hay error
    useEffect(() => {
        if (error) {
            setShowErrorModal(true);
        }
    }, [error]);


    //Para prueba(Borrar)
    useEffect(() => {
        console.log(user)
    }, []);

    const closeErrorModal = () => {
        setShowErrorModal(false);
    }

    const onSubmit = async (data: any) => {
        console.log('Form data:', data);

        const result = await login(data.email, data.password);

        console.log("Resultado del login", result)
        if (result) {
            console.log("Hola", user?.name);
            router.replace('/(tabs)')
        } else {

            console.log('Falló el inicio de sesión', error);
        }
    }

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />

                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logoIcon} source={require('../../assets/images/Logo22.png')}></Image>
                    </View>
                </View>

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
                            <HelperText type="error" style={styles.errorText}>{errors.email.message}</HelperText>
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
                <ErrorModal
                    visible={showErrorModal}
                    onClose={closeErrorModal}
                    title="Error de Autenticación"
                    message={error || 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.'}
                    buttonText="Entendido"
                />
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E293B',
        height: '100%'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoIcon: {
        width: 250,
        height: 250,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        minHeight: '50%',
        marginHorizontal: 15,
        marginVertical: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 15,
        height: 50,
    },
    inputIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#2c3e50',
        paddingVertical: 0,
    },
    eyeIcon: {
        padding: 5,
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 12,
        marginTop: 5,
    },
    newAccountContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    newAccountText: {
        color: '#3498db',
        fontSize: 14,
        fontWeight: '500',
    },
    loginButton: {
        backgroundColor: '#3498db',
        borderRadius: 8,
        paddingVertical: 15,
        marginTop: 10,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#3498db'
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Login
