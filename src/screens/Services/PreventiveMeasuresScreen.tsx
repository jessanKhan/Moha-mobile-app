import { View, FlatList } from 'react-native';
import Header from '../../components/Header';
import QuickLinksComponent from '../../components/quickLinkComponent/QuickLinksComponent';
import { ScaledSheet } from 'react-native-size-matters';
import { preventData } from '../../data/preventlinkData';
import CustomEmergencyContactComponent from '../../components/customEmergencyContact/CustomEmergencyContactComponent';
import PreventiveMeasureComponent from '../../components/preventiveMeasure/PreventiveMeasureComponent';
import AppBackground from '../../components/AppBackground';

const PreventiveMeasuresScreen = () => {
    return (
        <AppBackground>
            <Header
                title="প্রতিরোধমূলক ব্যবস্থা"
                showBackButton={true}
                subtitle="নিরাপত্তা টিপস এবং সতর্কতা"
            />

            <FlatList
                data={preventData}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                )}
                renderItem={({ item }) => (
                    <QuickLinksComponent
                        title={item.title}
                        gradientColors={item.gradientColors}
                        headerIcon={item.icon}
                        data={item.items}
                        keyExtractor={linkItem => linkItem.id}
                        renderItem={({ item: linkItem, index }) => (
                            <PreventiveMeasureComponent
                                text={linkItem.text}
                                isFirst={index === 0}
                            />
                        )}
                    />
                )}
                ListFooterComponent={() => (
                    <>
                        <View style={styles.spacer} />
                        <CustomEmergencyContactComponent
                            title="২৪/৭ জরুরি হটলাইন"
                            hotLineNumber="৯৯৯"
                        />
                    </>
                )}
            />
        </AppBackground>
    );
};

export default PreventiveMeasuresScreen;

const styles = ScaledSheet.create({
    listContent: {
        padding: '16@ms',
        paddingBottom: '24@ms',
    },
    separator: {
        height: '16@ms',
    },
    spacer: {
        height: '20@ms',
    },
});