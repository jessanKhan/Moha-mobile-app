import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react-native';

interface Props {
    formData: any;
    setFormData: (data: any) => void;
}

const Step3Location = ({ formData, setFormData }: Props) => {
    const languageMode = useSelector((state: RootState) => state.language.mode);
    const [showDatePanel, setShowDatePanel] = useState(false);
    const [showTimePanel, setShowTimePanel] = useState(false);

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = ["00", "15", "30", "45"];

    const handleDateSelect = (day: number) => {
        const formattedDate = `${day}/01/2026`;
        setFormData({ ...formData, eventDate: formattedDate });
        setShowDatePanel(false);
    };

    const handleTimeSelect = (h: string, m: string) => {
        setFormData({ ...formData, eventTime: `${h}:${m}` });
        setShowTimePanel(false);
    };

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

                {/* Inline Date Selection */}
                <View style={styles.inlinePickerContainer}>
                    <TouchableOpacity 
                        style={[styles.pickerTrigger, showDatePanel && styles.activeTrigger]} 
                        onPress={() => {
                            setShowDatePanel(!showDatePanel);
                            setShowTimePanel(false);
                        }}
                    >
                        <View style={styles.labelRow}>
                            <Calendar size={moderateScale(18)} color={showDatePanel ? "#1E3A8A" : "#6B7280"} />
                            <Text style={[styles.pickerValue, !formData.eventDate && { color: '#9CA3AF' }]}>
                                {formData.eventDate || (languageMode === 'en' ? "Select Date" : "তারিখ নির্বাচন করুন")}
                            </Text>
                        </View>
                        {showDatePanel ? <ChevronUp size={20} color="#1E3A8A" /> : <ChevronDown size={20} color="#6B7280" />}
                    </TouchableOpacity>

                    {showDatePanel && (
                        <View style={styles.expandedPanel}>
                            <Text style={styles.panelTitle}>{languageMode === 'en' ? "Select Day (Jan 2026)" : "দিন নির্বাচন করুন (জানুয়ারি ২০২৬)"}</Text>
                            <View style={styles.grid}>
                                {days.map(d => (
                                    <TouchableOpacity 
                                        key={d} 
                                        style={[styles.gridItem, formData.eventDate?.startsWith(d+'/') && styles.selectedItem]}
                                        onPress={() => handleDateSelect(d)}
                                    >
                                        <Text style={[styles.gridText, formData.eventDate?.startsWith(d+'/') && styles.selectedText]}>{d}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                {/* Inline Time Selection */}
                <View style={styles.inlinePickerContainer}>
                    <TouchableOpacity 
                        style={[styles.pickerTrigger, showTimePanel && styles.activeTrigger]} 
                        onPress={() => {
                            setShowTimePanel(!showTimePanel);
                            setShowDatePanel(false);
                        }}
                    >
                        <View style={styles.labelRow}>
                            <Clock size={moderateScale(18)} color={showTimePanel ? "#1E3A8A" : "#6B7280"} />
                            <Text style={[styles.pickerValue, !formData.eventTime && { color: '#9CA3AF' }]}>
                                {formData.eventTime || (languageMode === 'en' ? "Select Time" : "সময় নির্বাচন করুন")}
                            </Text>
                        </View>
                        {showTimePanel ? <ChevronUp size={20} color="#1E3A8A" /> : <ChevronDown size={20} color="#6B7280" />}
                    </TouchableOpacity>

                    {showTimePanel && (
                        <View style={styles.expandedPanel}>
                            <Text style={styles.panelTitle}>{languageMode === 'en' ? "Select Hour" : "ঘণ্টা নির্বাচন করুন"}</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.timeSelectionRow}>
                                    {hours.map(h => (
                                        <TouchableOpacity 
                                            key={h} 
                                            style={[styles.timeSlot, formData.eventTime?.startsWith(h+':') && styles.selectedItem]}
                                            onPress={() => handleTimeSelect(h, "00")}
                                        >
                                            <Text style={[styles.gridText, formData.eventTime?.startsWith(h+':') && styles.selectedText]}>{h}:00</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    )}
                </View>

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
    inlinePickerContainer: {
        backgroundColor: 'white',
        borderRadius: '16@ms',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
    },
    pickerTrigger: {
        height: '56@vs',
        paddingHorizontal: '20@ms',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    activeTrigger: {
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4FB',
        backgroundColor: '#F9FAFB',
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12@ms',
    },
    pickerValue: {
        fontSize: '15@ms',
        color: '#1F2937',
        fontFamily: 'July-Regular',
    },
    expandedPanel: {
        padding: '16@ms',
        backgroundColor: 'white',
    },
    panelTitle: {
        fontSize: '12@ms',
        color: '#6B7280',
        marginBottom: '12@vs',
        fontWeight: 'bold',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '8@ms',
    },
    gridItem: {
        width: '42@ms',
        height: '42@ms',
        backgroundColor: '#F3F4FB',
        borderRadius: '10@ms',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedItem: {
        backgroundColor: '#1E3A8A',
    },
    gridText: {
        fontSize: '14@ms',
        color: '#1F2937',
        fontWeight: '500',
    },
    selectedText: {
        color: 'white',
    },
    timeSelectionRow: {
        flexDirection: 'row',
        gap: '10@ms',
        paddingBottom: '8@vs',
    },
    timeSlot: {
        paddingHorizontal: '16@ms',
        paddingVertical: '10@vs',
        backgroundColor: '#F3F4FB',
        borderRadius: '10@ms',
    },
    textArea: {
        height: 'auto',
        minHeight: '120@vs',
        paddingVertical: '16@vs',
    }
});

export default Step3Location;
