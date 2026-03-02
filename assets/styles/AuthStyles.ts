import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
    height: 1000,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    minHeight: '50%',
    marginHorizontal: 15,
    marginVertical: 60,
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
    marginTop: 3,
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
    shadowColor: '#3498db',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 15,
    marginTop: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#3498db',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
