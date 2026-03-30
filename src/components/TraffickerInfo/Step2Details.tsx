import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {
    formData: any;
    setFormData: (data: any) => void;
}

const Step2Details = ({ formData, setFormData }: Props) => {
    const languageMode = useSelector((state: RootState) => state.language.mode);

    const activityOptions = [
        { labelBn: 'কাজের প্রলোভন', labelEn: 'Job Bait', val: 'কাজের প্রলোভন' },
        { labelBn: 'বিদেশে পাঠানোর কথা', labelEn: 'Promise of Overseas Job', val: 'বিদেশে পাঠানোর কথা' },
        { labelBn: 'বলপূর্বক চলাচল', labelEn: 'Forced Movement', val: 'বলপূর্বক চলাচল' },
        { labelBn: 'মিথ্যা বিবাহের প্রস্তাব', labelEn: 'Fake Marriage Proposal', val: 'মিথ্যা বিবাহের প্রস্তাব' },
        { labelBn: 'শিশু পাচার', labelEn: 'Child Trafficking', val: 'শিশু পাচার' },
        { labelBn: 'অল্প বয়সী', labelEn: 'Underage', val: 'অল্প বয়সী' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {languageMode === 'en' ? "Identity & Activity" : "পরিচয় ও কার্যকলাপ"}
            </Text>
            <Text style={styles.subtitle}>
                {languageMode === 'en' ? "Provide detailed information" : "বিস্তারিত তথ্য প্রদান করুন"}
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={languageMode === 'en' ? "Mobile Number (if known)" : "মোবাইল নম্বর (যদি জানা থাকে)"}
                    keyboardType="phone-pad"
                    style={styles.input}
                    placeholderTextColor="#9CA3AF"
                    value={formData.mobile}
                    onChangeText={(val) => setFormData({ ...formData, mobile: val })}
                />
                <TextInput
                    placeholder={languageMode === 'en' ? "Social Media Link (Optional)" : "সোশ্যাল মিডিয়া লিংক (ঐচ্ছিক)"}
                    style={styles.input}
                    placeholderTextColor="#9CA3AF"
                    value={formData.socialLink}
                    onChangeText={(val) => setFormData({ ...formData, socialLink: val })}
                />
                <TextInput
                    placeholder={languageMode === 'en' ? "Where Last Seen" : "কোথায় দেখা গেছে"}
                    style={styles.input}
                    placeholderTextColor="#9CA3AF"
                    value={formData.lastSeen}
                    onChangeText={(val) => setFormData({ ...formData, lastSeen: val })}
                />
            </View>

            <Text style={styles.label}>
                {languageMode === 'en' ? "Type of Activity" : "কী ধরনের কার্যকলাপ"}
            </Text>
            <Text style={styles.labelHint}>
                {languageMode === 'en' ? "(Can select multiple)" : "(একাধিক নির্বাচন করতে পারবেন)"}
            </Text>

            <View style={styles.activityContainer}>
                {activityOptions.map((item) => {
                    const isSelected = formData.activities.includes(item.val);
                    return (
                        <TouchableOpacity
                            key={item.val}
                            activeOpacity={0.7}
                            onPress={() => {
                                const newActivities = isSelected
                                    ? formData.activities.filter((a: string) => a !== item.val)
                                    : [...formData.activities, item.val];
                                setFormData({ ...formData, activities: newActivities });
                            }}
                            style={[
                                styles.activityButton,
                                isSelected && styles.activityButtonActive
                            ]}
                        >
                            <Text style={[
                                styles.activityText,
                                isSelected && styles.activityTextActive
                            ]}>
                                {languageMode === 'en' ? item.labelEn : item.labelBn}
                            </Text>
                            {isSelected && (
                                <View style={styles.checkWrapper}>
                                    <Check size={moderateScale(12)} color="white" />
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
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
    label: {
        fontSize: '16@ms',
        fontWeight: 'bold',
        color: '#374151',
        marginTop: '24@vs',
        marginBottom: '2@vs',
        fontFamily: 'July-Bold',
    },
    labelHint: {
        fontSize: '11@ms',
        color: '#9CA3AF',
        marginBottom: '16@vs',
        fontFamily: 'July-Regular',
    },
    activityContainer: {
        gap: '12@vs',
    },
    activityButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '20@ms',
        height: '56@vs',
        borderRadius: '16@ms',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: 'white',
    },
    activityButtonActive: {
        backgroundColor: '#F0FDF4',
        borderColor: '#10B981',
    },
    activityText: {
        fontSize: '14@ms',
        fontWeight: 'bold',
        color: '#4B5563',
        flex: 1,
        fontFamily: 'July-Bold',
    },
    activityTextActive: {
        color: '#047857',
    },
    checkWrapper: {
        backgroundColor: '#10B981',
        borderRadius: '10@ms',
        padding: '4@ms',
    },
});

export default Step2Details;
