import React, { FC, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { moderateScale, scale, verticalScale, ScaledSheet } from 'react-native-size-matters';
import { ChevronDown } from 'lucide-react-native';

type Country = {
    label: string;
    value: string;
};

const COUNTRIES: Country[] = [
    { label: 'বাংলাদেশ', value: 'BD' },
    { label: 'India', value: 'IN' },
    { label: 'Pakistan', value: 'PK' },
    { label: 'Nepal', value: 'NP' },
];

interface Props {
    onSelect?: (country: Country) => void;
}

const CountryDropdown: FC<Props> = ({ onSelect }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Country>(COUNTRIES[0]);

    const handleSelect = (item: Country) => {
        setSelected(item);
        setOpen(false);
        onSelect?.(item);
    };

    return (
        <View>
            {/* Button */}
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => setOpen(!open)}
            >
                <Text style={styles.buttonText}>{selected.label}</Text>
                <ChevronDown size={moderateScale(20)} color="#64748B" />
            </TouchableOpacity>

            {/* Dropdown - ScrollView with scrollEnabled={false} */}
            {open && (
                <View style={[styles.dropdown]}>
                    <ScrollView
                        nestedScrollEnabled={true}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                    >
                        {COUNTRIES.map(item => (
                            <TouchableOpacity
                                key={item.value}
                                style={styles.item}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.itemText}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default CountryDropdown;

const styles = ScaledSheet.create({
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: '14@ms',
        paddingVertical: '14@vs',
        paddingHorizontal: '16@ms',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    buttonText: {
        fontSize: '15@ms',
        fontWeight: '400',
        color: '#1E293B',
        fontFamily: 'July-Regular',
    },
    dropdown: {
        marginTop: '8@vs',
        backgroundColor: '#FFFFFF',
        borderRadius: '14@ms',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
        maxHeight: '200@vs',
    },
    item: {
        paddingVertical: '12@vs',
        paddingHorizontal: '16@ms',
    },
    itemText: {
        fontSize: '14@ms',
        color: '#1E293B',
        fontFamily: 'July-Regular',
    },
});