import React, { FC, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { moderateScale, scale, verticalScale, ScaledSheet } from 'react-native-size-matters';
import { ChevronDown } from 'lucide-react-native';
import { useQuery } from '@apollo/client/react';
import { COUNTRIES_QUERY } from '../../api/queries';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Country {
    id: number;
    name: string;
    nameBn: string;
    code: string;
}

interface CountriesData {
    countries: Country[];
}

interface Props {
    onSelect?: (country: Country) => void;
}

const CountryDropdown: FC<Props> = ({ onSelect }) => {
    const languageMode = useSelector((state: RootState) => state.language.mode);
    const { data, loading } = useQuery<CountriesData>(COUNTRIES_QUERY);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<any>(null);

    const countries = data?.countries || [];

    useEffect(() => {
        if (countries.length > 0 && !selected) {
            setSelected(countries[0]);
        }
    }, [countries, selected]);

    const handleSelect = (item: any) => {
        setSelected(item);
        setOpen(false);
        onSelect?.(item);
    };

    const getLabel = (item: any) => {
        if (!item) return '';
        return languageMode === 'en' ? item.name : item.nameBn;
    };

    if (loading && !data) {
        return (
            <View style={styles.button}>
                <ActivityIndicator size="small" color="#64748B" />
            </View>
        );
    }

    return (
        <View>
            {/* Button */}
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => setOpen(!open)}
            >
                <Text style={styles.buttonText}>{getLabel(selected)}</Text>
                <ChevronDown size={moderateScale(20)} color="#64748B" />
            </TouchableOpacity>

            {/* Dropdown - ScrollView with scrollEnabled={false} */}
            {open && (
                <View style={[styles.dropdown]}>
                    <ScrollView
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                    >
                        {countries.map((item: any) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.item}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.itemText}>{getLabel(item)}</Text>
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