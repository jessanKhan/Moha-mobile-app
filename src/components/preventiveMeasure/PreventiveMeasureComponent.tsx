import { Text, View } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import React, { FC } from 'react';
import { Circle } from 'lucide-react-native';

interface PrevientLinkComponentProps {
    text?: string;
    isFirst?: boolean;
}

const PreventiveMeasureComponent: FC<PrevientLinkComponentProps> = ({
    text,
    isFirst = false,
}) => {
    return (
        <View style={[styles.container, !isFirst && styles.notFirst]}>
            <Circle
                size={moderateScale(6)}
                fill="rgba(71, 85, 105, 1)"
                color="rgba(71, 85, 105, 1)"
                style={styles.bullet}
            />
            <Text style={styles.txt}>{text}</Text>
        </View>
    );
};

export default PreventiveMeasureComponent;

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
    },
    notFirst: {
        marginTop: '10@ms',
    },
    bullet: {
        marginTop: '6@ms',
        marginRight: '10@ms',
    },
    txt: {
        fontSize: '13@ms',
        fontWeight: '400',
        color: 'rgba(51, 65, 85, 1)',
        lineHeight: '20@ms',
        flex: 1,
    },
});