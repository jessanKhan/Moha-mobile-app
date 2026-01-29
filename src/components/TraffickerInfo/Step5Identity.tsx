import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserX, UserPlus, Check } from 'lucide-react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

interface Props {
    formData: any;
    setFormData: (data: any) => void;
}

const Step5Identity = ({ formData, setFormData }: Props) => (
    <View style={styles.container}>
        <Text style={styles.title}>আপনার পরিচয়</Text>
        <Text style={styles.subtitle}>সম্পূর্ণ ঐচ্ছিক</Text>

        <View style={styles.optionContainer}>
            <TouchableOpacity
                onPress={() => setFormData({ ...formData, identityPreference: 'anonymous' })}
                activeOpacity={0.8}
                style={[
                    styles.optionCard,
                    formData.identityPreference === 'anonymous' && styles.optionCardActive
                ]}
            >
                <View style={styles.optionMain}>
                    <View style={[
                        styles.iconWrapper,
                        formData.identityPreference === 'anonymous' ? styles.iconWrapperActive : styles.iconWrapperInactive
                    ]}>
                        <UserX size={moderateScale(24)} color="white" />
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={[
                            styles.optionTitle,
                            formData.identityPreference === 'anonymous' && styles.optionTitleActive
                        ]}>পরিচয় গোপন রেখে জমা দেব</Text>
                        <Text style={styles.optionDesc}>আপনার পরিচয় সম্পূর্ণ গোপন থাকবে। কর্তৃপক্ষ আপনার সাথে যোগাযোগ করতে পারবে না।</Text>
                    </View>
                </View>
                {formData.identityPreference === 'anonymous' && (
                    <View style={styles.checkWrapper}>
                        <Check size={moderateScale(14)} color="white" />
                    </View>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setFormData({ ...formData, identityPreference: 'contact' })}
                activeOpacity={0.8}
                style={[
                    styles.optionCard,
                    formData.identityPreference === 'contact' && styles.optionCardActive
                ]}
            >
                <View style={styles.optionMain}>
                    <View style={[
                        styles.iconWrapper,
                        formData.identityPreference === 'contact' ? styles.iconWrapperActive : styles.iconWrapperInactive
                    ]}>
                        <UserPlus size={moderateScale(24)} color="white" />
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={[
                            styles.optionTitle,
                            formData.identityPreference === 'contact' && styles.optionTitleActive
                        ]}>যোগাযোগ তথ্য দিতে চাই</Text>
                        <Text style={styles.optionDesc}>প্রয়োজনে কর্তৃপক্ষ আরও তথ্যের জন্য আপনার সাথে যোগাযোগ করতে পারবে।</Text>
                    </View>
                </View>
                {formData.identityPreference === 'contact' && (
                    <View style={styles.checkWrapper}>
                        <Check size={moderateScale(14)} color="white" />
                    </View>
                )}
            </TouchableOpacity>
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
    optionContainer: {
        gap: '16@vs',
    },
    optionCard: {
        padding: '20@ms',
        borderRadius: '24@ms',
        borderWidth: 1,
        borderColor: '#F3F4FB',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    optionCardActive: {
        backgroundColor: '#EEF2FF',
        borderColor: '#2563EB',
    },
    optionMain: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconWrapper: {
        padding: '12@ms',
        borderRadius: '16@ms',
        marginRight: '16@ms',
    },
    iconWrapperActive: {
        backgroundColor: '#2563EB',
    },
    iconWrapperInactive: {
        backgroundColor: '#E5E7EB',
    },
    textWrapper: {
        flex: 1,
    },
    optionTitle: {
        fontSize: '14@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '4@vs',
    },
    optionTitleActive: {
        color: '#1E40AF',
    },
    optionDesc: {
        fontSize: '10@ms',
        color: '#6B7280',
        lineHeight: '14@ms',
    },
    checkWrapper: {
        backgroundColor: '#2563EB',
        borderRadius: '12@ms',
        padding: '3@ms',
    },
});

export default Step5Identity;
