import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../../components/Header';
import { Filter, Search, BarChart3, Users, Scale, PhoneCall, Handshake, FileText, Newspaper, ShieldCheck, Link as LinkIcon } from 'lucide-react-native';
import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';
import { Text as SvgText } from 'react-native-svg';
import { ScaledSheet } from 'react-native-size-matters';
import { barData1, lineData1, lineData2, lineData3, barData2, pieData } from '../../data/statisticsData';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const StatisticsScreen = () => {
    const renderRightComponent = () => (
        <TouchableOpacity className="bg-white/20 flex-row items-center px-3 py-1.5 rounded-full border border-white/30">
            <Filter size={16} color="white" />
            <Text className="text-white ml-2 text-xs font-medium">ফিল্টার</Text>
        </TouchableOpacity>
    );

    const SummaryCard = ({ icon: Icon, count, title, colors }: any) => (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            // Keep functional layout classes, but move radius to style for reliability
            className="w-[48%] p-4 mb-4 flex justify-between"
            style={{
                height: 160,
                borderRadius: 20, // Explicitly set 20px
                overflow: 'hidden' // Ensures the gradient doesn't bleed past the corners
            }}
        >
            <View className="bg-white/20 self-start p-2 rounded-xl">
                <Icon size={24} color="white" />
            </View>
            <View>
                <Text className="text-white text-2xl font-bold mb-1">{count}</Text>
                <Text className="text-white/90 text-xs font-medium">{title}</Text>
            </View>
        </LinearGradient>
    );

    const ChartCard = ({ title, children, fullWidth = false }: any) => (
        <View className={`${fullWidth ? 'bg-white dark:bg-zinc-900 mb-4 shadow-sm' : 'bg-white dark:bg-zinc-900 mx-4 p-4 rounded-[20px] mb-4 shadow-sm'}`}>
            <Text className={`text-gray-800 dark:text-white font-bold text-lg mb-6 ${fullWidth ? 'px-4 pt-4' : ''}`}>{title}</Text>
            {children}
        </View>
    );

    return (
        <View className="flex-1 bg-gray-50 dark:bg-black">
            <Header
                title="পরিসংখ্যান"
                subtitle="মানব পাচার প্রতিরোধ তথ্য ও উপাত্ত"
                showBackButton={true}
                rightComponent={renderRightComponent()}
            />
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Summary Cards Grid */}
                <View className="flex-row flex-wrap justify-between p-4 px-4 pt-6">
                    <SummaryCard
                        icon={BarChart3}
                        count="১,২৪৫"
                        title="মোট রিপোর্টকৃত অভিযোগ"
                        colors={['#155DFC', '#1447E6']}
                    />
                    <SummaryCard
                        icon={Users}
                        count="৮৭৩"
                        title="উদ্ধারপ্রাপ্ত ভুক্তভোগী"
                        colors={['#009689', '#00786F']}
                    />
                    <SummaryCard
                        icon={Search}
                        count="১৫৬"
                        title="চলমান তদন্ত সংখ্যা"
                        colors={['#FA6700', '#C53B00']}
                    />
                    <SummaryCard
                        icon={ShieldCheck}
                        count="৩৪২"
                        title="সচেতনতামূলক কার্যক্রম"
                        colors={['#00A63E', '#008236']}
                    />
                </View>

                {/* Rescue Report Chart */}
                <ChartCard title="উদ্ধার প্রতিবেদন" fullWidth={true}>
                    <BarChart
                        barWidth={35}
                        noOfSections={3}
                        barBorderRadius={4}
                        frontColor="#14B8A6"
                        data={barData1}
                        yAxisThickness={0}
                        xAxisThickness={1}
                        xAxisColor={'#E5E7EB'}
                        hideRules
                        height={200}
                        width={screenWidth - 20}
                        xAxisLabelTextStyle={{ color: '#6B7280', fontSize: 10 }}
                    />
                </ChartCard>

                {/* Incident Trends Chart */}
                <ChartCard title="সময়ভিত্তিক ঘটনার প্রবণতা" fullWidth={true}>
                    <LineChart
                        data={lineData1}
                        data2={lineData2}
                        data3={lineData3}
                        height={200}
                        width={screenWidth - 20}
                        initialSpacing={20}
                        color1="#3B82F6"
                        color2="#14B8A6"
                        color3="#F59E0B"
                        textColor1="green"
                        dataPointsColor1="#3B82F6"
                        dataPointsColor2="#14B8A6"
                        dataPointsColor3="#F59E0B"
                        curved
                        startFillColor1="#3B82F6"
                        startFillColor2="#14B8A6"
                        startFillColor3="#F59E0B"
                        startOpacity={0.1}
                        endOpacity={0.1}
                        hideRules
                        hideYAxisText={false}
                        yAxisThickness={0}
                        xAxisThickness={1}
                        xAxisColor={'#E5E7EB'}
                    />
                    <View className="flex-row justify-center gap-4 mt-4 pb-4">
                        <View className="flex-row items-center"><View className="w-2 h-2 rounded-full bg-blue-500 mr-2" /><Text className="text-gray-500 text-xs">উদ্ধার</Text></View>
                        <View className="flex-row items-center"><View className="w-2 h-2 rounded-full bg-teal-500 mr-2" /><Text className="text-gray-500 text-xs">চলমান</Text></View>
                        <View className="flex-row items-center"><View className="w-2 h-2 rounded-full bg-orange-500 mr-2" /><Text className="text-gray-500 text-xs">রিপোর্ট</Text></View>
                    </View>
                </ChartCard>

                {/* Analysis Type Chart */}
                <ChartCard title="ঘটনার ধরন অনুযায়ী বিশ্লেষণ" fullWidth={true}>
                    <BarChart
                        barWidth={45}
                        noOfSections={3}
                        barBorderRadius={4}
                        data={barData2}
                        yAxisThickness={0}
                        xAxisThickness={1}
                        xAxisColor={'#E5E7EB'}
                        hideRules
                        height={200}
                        width={screenWidth - 20}
                        xAxisLabelTextStyle={{ color: '#6B7280', fontSize: 10, width: 60, textAlign: 'center' }}
                    />
                </ChartCard>

                {/* Pie Chart */}
                <ChartCard title="বয়স ও লিঙ্গভিত্তিক তথ্য">
                    <View className="items-center py-6">
                        <PieChart
                            data={pieData}
                            donut={false}
                            showExternalLabels
                            radius={120}
                            // showText={false}
                            labelsPosition="outward"
                            // labelLineConfig={{
                            //     length: 20,
                            //     tailLength: 10,
                            // }}
                            externalLabelComponent={(item: any) => (
                                <SvgText
                                    fill={item.textColor}
                                    fontSize="12"
                                    fontWeight="bold"
                                    x={item.shiftTextX || 0}
                                    y={item.shiftTextY || 0}
                                >
                                    {item.text}
                                </SvgText>
                            )}
                        />
                    </View>
                </ChartCard>

            </ScrollView>
        </View>
    );
};

export default StatisticsScreen;
