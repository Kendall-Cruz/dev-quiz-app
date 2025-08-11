import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { SafeAreaView, StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSessionContext } from "@/context/SessionContext";
import ErrorModal from "@/components/ErrorModal";

const Register = () => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
        },
    });

    const { register, message, error } = useSessionContext();

    const [showPassword, setShowPassword] = useState(false);


    const [showErrorModal, setShowErrorModal] = useState(false);

    // Mostrar modal cuando hay error
    useEffect(() => {
        if (error) {
            setShowErrorModal(true);
        }
    }, [error]);

    const closeErrorModal = () => {
        setShowErrorModal(false);
    }

    const submit = async (data: any) => {
        console.log(data);
        const result = await register(data.name, data.surname, data.email, data.password)
        console.log("resultado" , result)
        if (result) {
            router.back();
        } else {
            console.log('fallo')
            return;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />

            {/* Form */}
            <View style={styles.formContainer}>
                <Text style={styles.title}>Registrarse</Text>


                {/* Nombre */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nombre</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                        <Controller
                            control={control}
                            rules={{
                                required: 'El nombre es requerido'
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Nombre"
                                    placeholderTextColor="#999"
                                    autoCapitalize="none"

                                />
                            )}
                            name="name"
                        />
                    </View>
                    {errors.email && (
                        <Text style={styles.errorText}>{errors.email.message}</Text>
                    )}
                </View>


                {/* Apellido */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Apellido</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                        <Controller
                            control={control}
                            rules={{
                                required: 'El apellido es requerido'
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Apellido"
                                    placeholderTextColor="#999"
                                    autoCapitalize="none"

                                />
                            )}
                            name="surname"
                        />
                    </View>
                    {errors.email && (
                        <Text style={styles.errorText}>{errors.email.message}</Text>
                    )}
                </View>

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
                                    placeholder="Correo@***.com"
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
                    onPress={handleSubmit(submit)}
                >
                    <Text style={styles.loginButtonText}>Registrarse</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => { router.push('/(auth)/Login') }} style={styles.newAccountContainer}>
                    <Text style={styles.newAccountText}>Ya tengo cuenta (Iniciar sesión)</Text>
                </TouchableOpacity>
            </View>
            <ErrorModal
                visible={showErrorModal}
                onClose={closeErrorModal}
                title="Error de Registro"
                message={error || 'No se pudo crear tu cuenta. Por favor, verifica los datos e intenta nuevamente.'}
                buttonText="Revisar datos"
            />
        </SafeAreaView>
    )
}

export default Register


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E293B',
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
        width: 150,
        height: 1550,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 200
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        minHeight: '50%',
        marginHorizontal: 15,
        marginVertical: 60
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