import { Text, View, FlatList } from 'react-native';
import React, { FC } from 'react';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import CustomCommonIcon from '../customCommonIconComponent/CustomCommonIcon';
import { LucideIcon } from 'lucide-react-native';

interface QuickLinksComponentProps {
    title: string;
    gradientColors: string[];
    headerIcon?: LucideIcon;
    data?: any[];
    renderItem?: ({ item, index }: any) => React.ReactElement;
    keyExtractor?: (item: any, index: number) => string;
}

const QuickLinksComponent: FC<QuickLinksComponentProps> = ({
    title,
    gradientColors,
    headerIcon,
    data,
    renderItem,
    keyExtractor,
}) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.linearGradient}
            >
                <CustomCommonIcon
                    icon={headerIcon}
                    bgColor="rgba(255, 255, 255, 0.2)"
                    iconColor="#ffffff"
                    size={moderateScale(25)}
                />
                <Text style={styles.helptxt}>{title}</Text>
            </LinearGradient>
            <View style={styles.linkContainer}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default QuickLinksComponent;

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '16@ms',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    linearGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '20@ms',
        borderTopLeftRadius: '16@ms',
        borderTopRightRadius: '16@ms',
        gap: '12@ms',
    },
    helptxt: {
        fontSize: '20@ms',
        color: 'rgba(255, 255, 255, 1)',
        fontWeight: '700',
        lineHeight: '24@ms',
    },
    linkContainer: {
        padding: '16@ms',
    },
});