import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Upload } from 'lucide-react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

interface Props {
    formData: any;
    setFormData: (data: any) => void;
}

const Step1BasicInfo = ({ formData, setFormData }: Props) => (
    <View style={styles.container}>
        <Text style={styles.title}>পাচারকারীর প্রাথমিক তথ্য</Text>
        <Text style={styles.subtitle}>যতটুকু জানেন ততটুকু দিন</Text>

        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.uploadCard}
        >
            <View style={styles.iconWrapper}>
                <Upload size={moderateScale(32)} color="#9CA3AF" />
            </View>
            <Text style={styles.uploadText}>ছবি আপলোড</Text>
            <Text style={styles.uploadOptional}>(ঐচ্ছিক)</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
            <TextInput
                placeholder="পাচারকারীর নাম (যদি জানা থাকে)"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                value={formData.name}
                onChangeText={(val) => setFormData({ ...formData, name: val })}
            />
            <TextInput
                placeholder="ডাকনাম / পরিচিত নাম"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                value={formData.nickname}
                onChangeText={(val) => setFormData({ ...formData, nickname: val })}
            />
            <TextInput
                placeholder="আনুমানিক বয়স"
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                value={formData.age}
                onChangeText={(val) => setFormData({ ...formData, age: val })}
            />
        </View>

        <Text style={styles.label}>লিঙ্গ</Text>
        <View style={styles.genderRow}>
            {['পুরুষ', 'মহিলা', 'অন্যান্য'].map((item) => (
                <TouchableOpacity
                    key={item}
                    onPress={() => setFormData({ ...formData, gender: item })}
                    style={[
                        styles.genderButton,
                        formData.gender === item && styles.genderButtonActive
                    ]}
                >
                    <Text style={[
                        styles.genderButtonText,
                        formData.gender === item && styles.genderButtonTextActive
                    ]}>
                        {item}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

const styles = ScaledSheet.create({
    container: {
        paddingHorizontal: '20@ms',
        paddingVertical: '24@vs',
    },
    title: {
        fontSize: '18@ms',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '4@vs',
    },
    subtitle: {
        fontSize: '13@ms',
        color: '#9CA3AF',
        marginBottom: '24@vs',
    },
    uploadCard: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#D1D5DB',
        borderRadius: '24@ms',
        padding: '32@ms',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24@vs',
    },
    iconWrapper: {
        backgroundColor: 'white',
        padding: '16@ms',
        borderRadius: '30@ms',
        marginBottom: '12@vs',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    uploadText: {
        fontSize: '15@ms',
        fontWeight: 'bold',
        color: '#4B5563',
    },
    uploadOptional: {
        fontSize: '11@ms',
        color: '#9CA3AF',
        marginTop: '2@vs',
    },
    inputContainer: {
        gap: '12@vs',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: '16@ms',
        paddingHorizontal: '20@ms',
        height: '56@vs',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        color: '#1F2937',
        fontSize: '15@ms',
    },
    label: {
        fontSize: '16@ms',
        fontWeight: 'bold',
        color: '#374151',
        marginTop: '24@vs',
        marginBottom: '12@vs',
    },
    genderRow: {
        flexDirection: 'row',
        gap: '10@ms',
    },
    genderButton: {
        flex: 1,
        height: '48@vs',
        borderRadius: '12@ms',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    genderButtonActive: {
        backgroundColor: '#EEF2FF',
        borderColor: '#2563EB',
    },
    genderButtonText: {
        fontSize: '14@ms',
        fontWeight: 'bold',
        color: '#4B5563',
    },
    genderButtonTextActive: {
        color: '#2563EB',
    },
});

export default Step1BasicInfo;
