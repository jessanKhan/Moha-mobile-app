import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

interface Props {
    formData: any;
    setFormData: (data: any) => void;
}

const Step2Details = ({ formData, setFormData }: Props) => (
    <View style={styles.container}>
        <Text style={styles.title}>পরিচয় ও কার্যকলাপ</Text>
        <Text style={styles.subtitle}>বিস্তারিত তথ্য প্রদান করুন</Text>

        <View style={styles.inputContainer}>
            <TextInput
                placeholder="মোবাইল নম্বর (যদি জানা থাকে)"
                keyboardType="phone-pad"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                value={formData.mobile}
                onChangeText={(val) => setFormData({ ...formData, mobile: val })}
            />
            <TextInput
                placeholder="সোশ্যাল মিডিয়া লিংক (ঐচ্ছিক)"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                value={formData.socialLink}
                onChangeText={(val) => setFormData({ ...formData, socialLink: val })}
            />
            <TextInput
                placeholder="কোথায় দেখা গেছে"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                value={formData.lastSeen}
                onChangeText={(val) => setFormData({ ...formData, lastSeen: val })}
            />
        </View>

        <Text style={styles.label}>কী ধরনের কার্যকলাপ</Text>
        <Text style={styles.labelHint}>(একাধিক নির্বাচন করতে পারবেন)</Text>

        <View style={styles.activityContainer}>
            {['কাজের প্রলোভন', 'বিদেশে পাঠানোর কথা', 'বলপূর্বক চলাচল', 'মিথ্যা বিবাহের প্রস্তাব', 'শিশু পাচার'].map((item) => {
                const isSelected = formData.activities.includes(item);
                return (
                    <TouchableOpacity
                        key={item}
                        activeOpacity={0.7}
                        onPress={() => {
                            const newActivities = isSelected
                                ? formData.activities.filter((a: string) => a !== item)
                                : [...formData.activities, item];
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
                            {item}
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
        marginBottom: '2@vs',
    },
    labelHint: {
        fontSize: '11@ms',
        color: '#9CA3AF',
        marginBottom: '16@vs',
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
