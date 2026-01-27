import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image as ImageIcon, Video, Mic, AlertCircle } from 'lucide-react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

const Step4Evidence = () => (
    <View style={styles.container}>
        <Text style={styles.title}>প্রমাণ</Text>
        <Text style={styles.subtitle}>ঐচ্ছিক কিন্তু সহায়ক</Text>

        <View style={styles.infoBox}>
            <Text style={styles.infoText}>
                যদি আপনার কাছে কোনো ছবি, ভিডিও বা অডিও রেকর্ডিং থাকে যা প্রমাণ হিসেবে কাজ করতে পারে, তাহলে সেগুলো আপলোড করুন। এটি ঐচ্ছিক কিন্তু তদন্তে সহায়ক হবে।
            </Text>
        </View>

        <View style={styles.evidenceRow}>
            {[
                { label: 'ছবি', icon: ImageIcon, color: '#EFF6FF', iconColor: '#3B82F6' },
                { label: 'ভিডিও', icon: Video, color: '#F0FDFA', iconColor: '#14B8A6' },
                { label: 'অডিও', icon: Mic, color: '#F5F3FF', iconColor: '#8B5CF6' }
            ].map((item) => (
                <TouchableOpacity
                    key={item.label}
                    activeOpacity={0.7}
                    style={[styles.evidenceButton, { backgroundColor: item.color }]}
                >
                    <item.icon size={moderateScale(24)} color={item.iconColor} />
                    <Text style={styles.evidenceLabel}>{item.label}</Text>
                </TouchableOpacity>
            ))}
        </View>

        <View style={styles.alertBox}>
            <AlertCircle size={moderateScale(20)} color="#EAB308" style={styles.alertIcon} />
            <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>ফাইল নিরাপত্তা:</Text>
                <Text style={styles.alertBody}>
                    আপনার আপলোড করা সকল ফাইল এনক্রিপ্ট করে সংরক্ষণ করা হবে এবং শুধুমাত্র অনুমোদিত কর্তৃপক্ষ দেখতে পারবে।
                </Text>
            </View>
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
    infoBox: {
        backgroundColor: '#EFF6FF',
        borderRadius: '16@ms',
        padding: '20@ms',
        marginBottom: '24@vs',
        borderWidth: 1,
        borderColor: '#DBEAFE',
    },
    infoText: {
        color: '#1E40AF',
        fontSize: '12@ms',
        lineHeight: '18@ms',
    },
    evidenceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '24@vs',
    },
    evidenceButton: {
        width: '30%',
        aspectRatio: 1,
        borderRadius: '16@ms',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F3F4FB',
    },
    evidenceLabel: {
        fontSize: '12@ms',
        fontWeight: 'bold',
        color: '#374151',
        marginTop: '8@vs',
    },
    alertBox: {
        backgroundColor: '#FEFCE8',
        borderRadius: '16@ms',
        padding: '20@ms',
        borderWidth: 1,
        borderColor: '#FEF9C3',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    alertIcon: {
        marginTop: '2@vs',
    },
    alertContent: {
        flex: 1,
        marginLeft: '12@ms',
    },
    alertTitle: {
        color: '#854D0E',
        fontWeight: 'bold',
        fontSize: '12@ms',
        marginBottom: '4@vs',
    },
    alertBody: {
        color: '#854D0E',
        fontSize: '10@ms',
        lineHeight: '16@ms',
        opacity: 0.8,
    },
});

export default Step4Evidence;
