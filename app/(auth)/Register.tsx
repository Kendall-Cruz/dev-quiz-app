import LogoXl from "@/components/LogoXl";
import ModalInfo from "@/components/ModalInfo";
import { useSessionContext } from "@/context/SessionContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import { authStyles as styles } from '../../assets/styles/AuthStyles';
import { replace } from "expo-router/build/global-state/routing";

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
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Mostrar modal cuando hay error
    useEffect(() => {
        if (error) {
            setShowErrorModal(true);
        }
    }, [error]);

    useEffect(() => {
        if (message)
            setShowSuccessModal(true)
    }, [message]);

    const closeErrorModal = () => {
        setShowErrorModal(false);
    }

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
    }

    const submit = async (data: any) => {
        console.log(data);
        const result = await register(data.name, data.surname, data.email, data.password)
        console.log("resultado", result)
        if (result) {
            console.log('se registr´o')
        } else {
            console.log('fallo') //Borrar prueba
            return;
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <ScrollView>
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
                        {errors.name && (
                            <Text style={styles.errorText}>{errors.name.message}</Text>
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
                        {errors.surname && (
                            <Text style={styles.errorText}>{errors.surname.message}</Text>
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
                        style={styles.registerButton}
                        onPress={handleSubmit(submit)}
                    >
                        <Text style={styles.registerButtonText}>Registrarse</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => { router.push('/(auth)/Login') }} style={styles.newAccountContainer}>
                        <Text style={styles.newAccountText}>Ya tengo cuenta (Iniciar sesión)</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ModalInfo
                visible={showErrorModal}
                onClose={closeErrorModal}
                title="Error de Registro"
                message={error || 'No se pudo crear tu cuenta. Por favor, verifica los datos e intenta nuevamente.'}
                buttons={[
                    { text: 'Revisar Datos', color: "red", onPress: closeErrorModal }
                ]}
                icon={{ name: 'alert-circle', color: 'red' }}
            />
            <ModalInfo
                visible={showSuccessModal}
                onClose={closeSuccessModal}
                title="Usuario registrado"
                message={"Se registro el usuario exitosamente"}
                icon={{ name: 'information-circle', color: 'blue' }}
                buttons={[
                    {text: 'Iniciar Sesión' , color:'blue' , onPress: () => {router.back()}}
                ]}
            />
        </SafeAreaView>
    )
}

export default Register


