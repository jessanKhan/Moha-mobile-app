import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {
    formData: any;
    setFormData: (data: any) => void;
}

const Step3Location = ({ formData, setFormData }: Props) => {
    const languageMode = useSelector((state: RootState) => state.language.mode);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {languageMode === 'en' ? "Place & Time" : "স্থান ও সময়"}
            </Text>
            <Text style={styles.subtitle}>
                {languageMode === 'en' ? "Provide incident details" : "ঘটনার বিবরণ দিন"}
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={languageMode === 'en' ? "Incident Place" : "ঘটনার স্থান"}
                    style={styles.input}
                    placeholderTextColor="#9CA3AF"
                    value={formData.eventPlace}
                    onChangeText={(val) => setFormData({ ...formData, eventPlace: val })}
                />
                <TextInput
                    placeholder={languageMode === 'en' ? "Select Place" : "স্থান নির্বাচন করুন"}
                    style={styles.input}
                    placeholderTextColor="#9CA3AF"
                    value={formData.selectPlace}
                    onChangeText={(val) => setFormData({ ...formData, selectPlace: val })}
                />
                <TextInput
                    placeholder={languageMode === 'en' ? "Write Address" : "ঠিকানা লিখুন"}
                    style={styles.input}
                    placeholderTextColor="#9CA3AF"
                    value={formData.address}
                    onChangeText={(val) => setFormData({ ...formData, address: val })}
                />
                <TextInput
                    placeholder={languageMode === 'en' ? "Brief description of incident" : "ঘটনার সংক্ষিপ্ত বিবরণ"}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={[styles.input, styles.textArea]}
                    placeholderTextColor="#9CA3AF"
                    value={formData.description}
                    onChangeText={(val) => setFormData({ ...formData, description: val })}
                />
            </View>
        </View>
    );
};

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
        fontFamily: 'July-Bold',
    },
    subtitle: {
        fontSize: '13@ms',
        color: '#9CA3AF',
        marginBottom: '24@vs',
        fontFamily: 'July-Regular',
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
        fontFamily: 'July-Regular',
    },
    textArea: {
        height: 'auto',
        minHeight: '120@vs',
        paddingVertical: '16@vs',
    }
});

export default Step3Location;
