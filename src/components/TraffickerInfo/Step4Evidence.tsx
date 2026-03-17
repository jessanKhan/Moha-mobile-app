import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image as ImageIcon, Video, Mic, AlertCircle, Trash2 } from 'lucide-react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {
    formData: any;
    onPickFile: () => void;
    setFormData: (data: any) => void;
}

const Step4Evidence = ({ formData, onPickFile, setFormData }: Props) => {
    const languageMode = useSelector((state: RootState) => state.language.mode);

    const evidenceOptions = [
        { labelBn: 'গ্যালারি', labelEn: 'Gallery', icon: ImageIcon, color: '#EFF6FF', iconColor: '#3B82F6' },
        { labelBn: 'ভিডিও', labelEn: 'Video', icon: Video, color: '#F0FDFA', iconColor: '#14B8A6' },
        { labelBn: 'অডিও', labelEn: 'Audio', icon: Mic, color: '#F5F3FF', iconColor: '#8B5CF6' }
    ];

    const removeFile = (index: number) => {
        const newFiles = [...formData.evidenceFiles];
        newFiles.splice(index, 1);
        setFormData({ ...formData, evidenceFiles: newFiles });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {languageMode === 'en' ? "Evidence" : "প্রমাণ"}
            </Text>
            <Text style={styles.subtitle}>
                {languageMode === 'en' ? "Optional but helpful" : "ঐচ্ছিক কিন্তু সহায়ক"}
            </Text>

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                    {languageMode === 'en'
                        ? "If you have any photos, videos, or audio recordings that can serve as evidence, please upload them. This is optional but will be helpful in the investigation."
                        : "যদি আপনার কাছে কোনো ছবি, ভিডিও বা অডিও রেকর্ডিং থাকে যা প্রমাণ হিসেবে কাজ করতে পারে, তাহলে সেগুলো আপলোড করুন। এটি ঐচ্ছিক কিন্তু তদন্তে সহায়ক হবে।"}
                </Text>
            </View>

            <View style={styles.evidenceRow}>
                {evidenceOptions.map((item) => (
                    <TouchableOpacity
                        key={item.labelBn}
                        activeOpacity={0.7}
                        onPress={onPickFile}
                        style={[styles.evidenceButton, { backgroundColor: item.color }]}
                    >
                        <item.icon size={moderateScale(24)} color={item.iconColor} />
                        <Text style={styles.evidenceLabel}>
                            {languageMode === 'en' ? item.labelEn : item.labelBn}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {formData.evidenceFiles && formData.evidenceFiles.length > 0 && (
                <View style={styles.fileList}>
                    <Text style={styles.fileListTitle}>
                        {languageMode === 'en' ? "Selected Files:" : "নির্বাচিত ফাইলসমূহ:"}
                    </Text>
                    {formData.evidenceFiles.map((file: any, index: number) => (
                        <View key={index} style={styles.fileItem}>
                            <View style={styles.fileInfo}>
                                <ImageIcon size={moderateScale(16)} color="#4B5563" />
                                <Text style={styles.fileName} numberOfLines={1}>
                                    {file.fileName || file.uri.split('/').pop()}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => removeFile(index)}>
                                <Trash2 size={moderateScale(18)} color="#EF4444" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}

            <View style={styles.alertBox}>
                <AlertCircle size={moderateScale(20)} color="#EAB308" style={styles.alertIcon} />
                <View style={styles.alertContent}>
                    <Text style={styles.alertTitle}>
                        {languageMode === 'en' ? "File Security:" : "ফাইল নিরাপত্তা:"}
                    </Text>
                    <Text style={styles.alertBody}>
                        {languageMode === 'en'
                            ? "All your uploaded files will be stored encrypted and can only be viewed by authorized authorities."
                            : "আপনার আপলোড করা সকল ফাইল এনক্রিপ্ট করে সংরক্ষণ করা হবে এবং শুধুমাত্র অনুমোদিত কর্তৃপক্ষ দেখতে পারবে।"}
                    </Text>
                </View>
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
        fontFamily: 'July-Regular',
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
        fontFamily: 'July-Bold',
    },
    fileList: {
        marginBottom: '24@vs',
        backgroundColor: 'white',
        padding: '16@ms',
        borderRadius: '16@ms',
        borderWidth: 1,
        borderColor: '#F3F4FB',
    },
    fileListTitle: {
        fontSize: '13@ms',
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: '12@vs',
        fontFamily: 'July-Bold',
    },
    fileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '8@vs',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4FB',
    },
    fileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: '12@ms',
    },
    fileName: {
        fontSize: '12@ms',
        color: '#4B5563',
        marginLeft: '8@ms',
        fontFamily: 'July-Regular',
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
        fontFamily: 'July-Bold',
    },
    alertBody: {
        color: '#854D0E',
        fontSize: '10@ms',
        lineHeight: '16@ms',
        opacity: 0.8,
        fontFamily: 'July-Regular',
    },
});

export default Step4Evidence;
