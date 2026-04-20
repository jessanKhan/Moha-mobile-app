import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { Filter, Search, BarChart3, Users, ShieldCheck, ChevronDown } from 'lucide-react-native';
import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';
import { Text as SvgText } from 'react-native-svg';
import { ScaledSheet, scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import AppBackground from '../../components/AppBackground';
import { useQuery } from '@apollo/client/react';
import { REPORT_TABLES_QUERY } from '../../api/queries';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const screenWidth = Dimensions.get('window').width;

// Helper to check if a string is numeric
const isNumeric = (str: string) => {
    if (typeof str !== 'string') return false;
    return !isNaN(str as any) && !isNaN(parseFloat(str));
};

// Safe number parser — strips commas, returns 0 for any non-numeric value
const safeNumber = (val: any): number => {
    if (val === null || val === undefined) return 0;
    const str = String(val).replace(/,/g, '').trim();
    const num = Number(str);
    return isNaN(num) ? 0 : num;
};

const StatisticsScreen = () => {
    const languageMode = useSelector((state: RootState) => state.language.mode);
    const { data, loading, error } = useQuery<any>(REPORT_TABLES_QUERY);

    // States for filtering
    const [selectedName, setSelectedName] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

    // Chart states
    const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
    const [xKey, setXKey] = useState<string | null>(null);
    const [yKey, setYKey] = useState<string | null>(null);

    const reportTables = data?.reportTables || [];

    // Unique report names
    const reportNames = useMemo(() => {
        return [...new Set(reportTables?.map((r: any) => r.name) || [])] as string[];
    }, [reportTables]);

    // Set initial selected name if available
    useEffect(() => {
        if (!selectedName && reportNames.length > 0) {
            setSelectedName(reportNames[0]);
        }
    }, [reportNames, selectedName]);

    // Filter years based on selected name
    const availableYears = useMemo(() => {
        if (!selectedName) return [];

        const years = reportTables
            ?.filter((r: any) => r.name === selectedName)
            .map((r: any) => r.year);

        return [...new Set(years)].sort((a: any, b: any) => Number(b) - Number(a)) as string[]; // latest first
    }, [reportTables, selectedName]);

    // Set initial selected year if available
    useEffect(() => {
        if (!selectedYear && availableYears.length > 0) {
            setSelectedYear(availableYears[0]);
        } else if (selectedYear && !availableYears.includes(selectedYear)) {
            // Reset year if it's not valid for the newly selected report
            setSelectedYear(availableYears.length > 0 ? availableYears[0] : null);
        }
    }, [availableYears, selectedYear]);

    // Get filtered table
    const table = useMemo(() => {
        return reportTables?.find(
            (r: any) => r.name === selectedName && r.year === selectedYear
        );
    }, [reportTables, selectedName, selectedYear]);

    // Auto select all columns
    useEffect(() => {
        if (table?.columns) {
            setSelectedColumns(table.columns.map((c: any) => c.key));
        }
    }, [table]);

    // Separate numeric & categorical columns
    const numericColumns = useMemo(
        () => {
            if (!table?.columns) return [];
            return table.columns.filter((col: any) =>
                table.rows.some((row: any) => {
                    const val = row.data[col.key]?.en || row.data[col.key]?.bn;
                    return isNumeric(val);
                })
            );
        },
        [table]
    );

    const categoricalColumns = useMemo(
        () => {
            if (!table?.columns) return [];
            return table.columns.filter((col: any) =>
                table.rows.some((row: any) => {
                    const val = row.data[col.key]?.en || row.data[col.key]?.bn;
                    return !isNumeric(val) || val === undefined;
                })
            );
        },
        [table]
    );

    // Set default keys if available
    useEffect(() => {
        if (categoricalColumns.length > 0 && !xKey) {
            setXKey(categoricalColumns[0].key);
        }
        if (numericColumns.length > 0 && !yKey) {
            setYKey(numericColumns[0].key);
        }
    }, [categoricalColumns, numericColumns, xKey, yKey]);

    // Reset keys if table changes and keys are no longer valid
    useEffect(() => {
        // Optionally you can check if xKey presents in table.columns
        // But setting it empty if table changed can be safer
        if (table) {
            setXKey(null);
            setYKey(null);
        }
    }, [table?.id]);

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c", "#14B8A6", "#3B82F6", "#F59E0B"];

    // Generic Dropdown Component
    const SelectDropdown = ({ label, options, selectedValue, onSelect, placeholder, isObjKeys = false }: any) => {
        const [isOpen, setIsOpen] = useState(false);

        const handleSelect = (val: string) => {
            onSelect(val);
            setIsOpen(false);
        };

        const getDisplayLabel = (val: string) => {
            if (!val) return placeholder;
            if (isObjKeys) {
                const opt = options.find((o: any) => o.key === val);
                return opt ? (languageMode === 'en' ? (opt.en || opt.bn) : (opt.bn || opt.en)) : val;
            }
            if (val === 'bar') return languageMode === 'en' ? 'BAR CHART' : 'বার চার্ট';
            if (val === 'line') return languageMode === 'en' ? 'LINE CHART' : 'লাইন চার্ট';
            if (val === 'pie') return languageMode === 'en' ? 'PIE CHART' : 'পাই চার্ট';
            return val;
        };

        return (
            <View style={styles.dropdownContainer}>
                {label && <Text style={styles.filterTitle}>{label}</Text>}
                <TouchableOpacity
                    style={styles.dropdownButton}
                    activeOpacity={0.8}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <Text style={[styles.dropdownButtonText, !selectedValue && { color: '#9CA3AF' }]}>
                        {getDisplayLabel(selectedValue)}
                    </Text>
                    <ChevronDown size={moderateScale(20)} color="#64748B" />
                </TouchableOpacity>

                {isOpen && (
                    <View style={styles.dropdownList}>
                        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                            {options.map((opt: any) => {
                                const val = isObjKeys ? opt.key : opt;
                                const display = isObjKeys
                                    ? (languageMode === 'en' ? (opt.en || opt.bn) : (opt.bn || opt.en))
                                    : getDisplayLabel(opt);
                                return (
                                    <TouchableOpacity
                                        key={val}
                                        style={[styles.dropdownItem, selectedValue === val && { backgroundColor: '#F3F4F6' }]}
                                        onPress={() => handleSelect(val)}
                                    >
                                        <Text style={[styles.dropdownItemText, selectedValue === val && { color: '#1D4ED8', fontFamily: 'July-Bold' }]}>
                                            {display}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                )}
            </View>
        );
    };



    const SummaryCard = ({ icon: Icon, count, title, colors }: any) => (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryCard}
        >
            <View style={styles.iconWrapper}>
                <Icon size={moderateScale(24)} color="white" />
            </View>
            <View>
                <Text style={styles.countText}>{count}</Text>
                <Text style={styles.titleText}>{title}</Text>
            </View>
        </LinearGradient>
    );

    const ChartCard = ({ title, children, fullWidth = false }: any) => (
        <View style={[styles.card, fullWidth ? styles.fullWidthCard : styles.marginCard]}>
            <Text style={styles.chartTitle}>{title}</Text>
            {children}
        </View>
    );

    return (
        <AppBackground>
            <Header
                title={languageMode === 'en' ? "Statistics" : "পরিসংখ্যান"}
                subtitle={languageMode === 'en' ? "Human trafficking prevention data and statistics" : "মানব পাচার প্রতিরোধ তথ্য ও উপাত্ত"}
                showBackButton={true}
            // rightComponent={renderRightComponent()}
            />
            <ScrollView style={styles.flex1} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Summary Cards Grid */}
                <View style={styles.gridContainer}>
                    <SummaryCard
                        icon={BarChart3}
                        count={languageMode === 'en' ? "1,245" : "১,২৪৫"}
                        title={languageMode === 'en' ? "Total Complaints" : "মোট রিপোর্টকৃত অভিযোগ"}
                        colors={['#155DFC', '#1447E6']}
                    />
                    <SummaryCard
                        icon={Users}
                        count={languageMode === 'en' ? "873" : "৮৭৩"}
                        title={languageMode === 'en' ? "Rescued Victims" : "উদ্ধারপ্রাপ্ত ভুক্তভোগী"}
                        colors={['#009689', '#00786F']}
                    />
                    <SummaryCard
                        icon={Search}
                        count={languageMode === 'en' ? "156" : "১৫৬"}
                        title={languageMode === 'en' ? "Ongoing Investigations" : "চলমান তদন্ত সংখ্যা"}
                        colors={['#FA6700', '#C53B00']}
                    />
                    <SummaryCard
                        icon={ShieldCheck}
                        count={languageMode === 'en' ? "342" : "৩৪২"}
                        title={languageMode === 'en' ? "Awareness Activities" : "সচেতনতামূলক কার্যক্রম"}
                        colors={['#00A63E', '#008236']}
                    />
                </View>

                {loading && <ActivityIndicator size="large" color="#155DFC" style={{ marginVertical: scale(20) }} />}
                {!loading && table && (
                    <>
                        {/* Filters Dropdown Pickers */}
                        <View style={styles.filterSection}>
                            <SelectDropdown
                                label={languageMode === 'en' ? "Select Report" : "প্রতিবেদন নির্বাচন করুন"}
                                placeholder={languageMode === 'en' ? "Select Report" : "প্রতিবেদন নির্বাচন করুন"}
                                options={reportNames}
                                selectedValue={selectedName}
                                onSelect={setSelectedName}
                            />

                            <SelectDropdown
                                label={languageMode === 'en' ? "Select Year" : "বছর নির্বাচন করুন"}
                                placeholder={languageMode === 'en' ? "Select Year" : "বছর নির্বাচন করুন"}
                                options={availableYears}
                                selectedValue={selectedYear}
                                onSelect={setSelectedYear}
                            />
                        </View>

                        <ChartCard title={languageMode === 'en' ? table.name : (table.nameBn || table.name)}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View>
                                    {/* Header Row */}
                                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingBottom: scale(10) }}>
                                        {table.columns.filter((col: any) => selectedColumns.includes(col.key)).map((col: any) => (
                                            <View key={col.key} style={{ width: scale(120), paddingHorizontal: scale(5) }}>
                                                <Text style={{ fontSize: moderateScale(11), fontWeight: 'bold', color: '#1F2937', fontFamily: 'July-Bold' }}>
                                                    {languageMode === 'en' ? (col.en || col.bn) : (col.bn || col.en)}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                    {/* Data Rows */}
                                    {table.rows.map((row: any) => (
                                        <View key={row.id} style={{ flexDirection: 'row', paddingVertical: scale(10), borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
                                            {table.columns.filter((col: any) => selectedColumns.includes(col.key)).map((col: any) => (
                                                <View key={col.key} style={{ width: scale(120), paddingHorizontal: scale(5) }}>
                                                    <Text style={{ fontSize: moderateScale(11), color: '#6B7280', fontFamily: 'July-Regular' }}>
                                                        {languageMode === 'en' ? (row.data[col.key]?.en || row.data[col.key]?.bn || '-') : (row.data[col.key]?.bn || row.data[col.key]?.en || '-')}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </ChartCard>

                        {/* Chart Preview Type Selectors */}
                        <View style={styles.filterSection}>
                            <SelectDropdown
                                label={languageMode === 'en' ? "Chart Type" : "চার্টের ধরন"}
                                placeholder={languageMode === 'en' ? "Chart Type" : "চার্টের ধরন"}
                                options={["bar", "line", "pie"]}
                                selectedValue={chartType}
                                onSelect={(val: any) => setChartType(val)}
                            />

                            <SelectDropdown
                                label={languageMode === 'en' ? "X-axis" : "এক্স-অক্ষ (X-axis)"}
                                placeholder={languageMode === 'en' ? "X-axis" : "এক্স-অক্ষ"}
                                options={categoricalColumns}
                                selectedValue={xKey}
                                onSelect={setXKey}
                                isObjKeys={true}
                            />

                            <SelectDropdown
                                label={languageMode === 'en' ? "Y-axis" : "ওয়াই-অক্ষ (Y-axis)"}
                                placeholder={languageMode === 'en' ? "Y-axis" : "ওয়াই-অক্ষ"}
                                options={numericColumns}
                                selectedValue={yKey}
                                onSelect={setYKey}
                                isObjKeys={true}
                            />
                        </View>

                        {/* Dynamic Chart */}
                        {xKey && yKey && (
                            <ChartCard title={languageMode === 'en' ? "Chart Preview" : "চার্ট প্রিভিউ"}>
                                {chartType === 'bar' && (
                                    <BarChart
                                        barWidth={scale(35)}
                                        noOfSections={4}
                                        barBorderRadius={4}
                                        frontColor="#14B8A6"
                                        data={table.rows.map((row: any) => ({
                                            value: safeNumber(row.data[yKey]?.en),
                                            label: (languageMode === 'en' ? (row.data[xKey]?.en || row.data[xKey]?.bn || "-") : (row.data[xKey]?.bn || row.data[xKey]?.en || "-"))
                                        }))}
                                        yAxisThickness={0}
                                        xAxisThickness={1}
                                        xAxisColor={'#E5E7EB'}
                                        hideRules
                                        height={verticalScale(144)}
                                        width={screenWidth - scale(60)}
                                        xAxisLabelTextStyle={{ color: '#6B7280', fontSize: moderateScale(9), width: scale(50), textAlign: 'center' }}
                                    />
                                )}
                                {chartType === 'line' && (
                                    <LineChart
                                        data={table.rows.map((row: any) => ({
                                            value: safeNumber(row.data[yKey]?.en),
                                            label: (languageMode === 'en' ? (row.data[xKey]?.en || row.data[xKey]?.bn || "-") : (row.data[xKey]?.bn || row.data[xKey]?.en || "-"))
                                        }))}
                                        height={verticalScale(144)}
                                        width={screenWidth - scale(60)}
                                        initialSpacing={scale(20)}
                                        color1="#3B82F6"
                                        dataPointsColor1="#3B82F6"
                                        startFillColor1="#3B82F6"
                                        startOpacity={0.1}
                                        endOpacity={0.1}
                                        hideRules
                                        yAxisThickness={0}
                                        xAxisThickness={1}
                                        xAxisColor={'#E5E7EB'}
                                        xAxisLabelTextStyle={{ color: '#6B7280', fontSize: moderateScale(9), width: scale(50), textAlign: 'center' }}
                                    />
                                )}
                                {chartType === 'pie' && (() => {
                                    const pieData = table.rows.map((row: any, index: number) => ({
                                        value: safeNumber(row.data[yKey]?.en),
                                        label: (languageMode === 'en'
                                            ? (row.data[xKey]?.en || row.data[xKey]?.bn || '-')
                                            : (row.data[xKey]?.bn || row.data[xKey]?.en || '-')),
                                        color: COLORS[index % COLORS.length],
                                    }));
                                    const total = pieData.reduce((s: number, d: any) => s + d.value, 0);

                                    return (
                                        <View style={styles.pieContainer}>
                                            <PieChart
                                                data={pieData.map((d: any) => ({
                                                    value: d.value,
                                                    color: d.color,
                                                }))}
                                                donut
                                                radius={scale(75)}
                                                innerRadius={scale(42)}
                                                innerCircleColor={'#FFFFFF'}
                                                centerLabelComponent={() => (
                                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ fontSize: moderateScale(18), fontWeight: 'bold', color: '#1F2937', fontFamily: 'July-Bold' }}>
                                                            {total}
                                                        </Text>
                                                        <Text style={{ fontSize: moderateScale(10), color: '#6B7280', fontFamily: 'July-Regular' }}>
                                                            {languageMode === 'en' ? 'Total' : 'মোট'}
                                                        </Text>
                                                    </View>
                                                )}
                                            />
                                            {/* Legend */}
                                            <View style={styles.pieLegendWrap}>
                                                {pieData.map((d: any, i: number) => (
                                                    <View key={i} style={styles.pieLegendRow}>
                                                        <View style={[styles.pieLegendDot, { backgroundColor: d.color }]} />
                                                        <Text style={styles.pieLegendLabel} numberOfLines={1}>{d.label}</Text>
                                                        <Text style={styles.pieLegendVal}>{d.value}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    );
                                })()}
                            </ChartCard>
                        )}
                    </>
                )}
            </ScrollView>
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
    flex1: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: '40@vs',
    },
    filterBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        paddingHorizontal: '12@ms',
        paddingVertical: '6@vs',
        borderRadius: '20@ms',
    },
    filterText: {
        color: 'white',
        fontWeight: '500',
        fontSize: '12@ms',
        marginLeft: '8@ms',
        fontFamily: 'July-Regular',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '16@ms',
        paddingTop: '20@vs',
    },
    summaryCard: {
        width: '48%',
        height: '150@vs',
        padding: '16@ms',
        borderRadius: '20@ms',
        marginBottom: '16@vs',
        justifyContent: 'space-between',
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignSelf: 'flex-start',
        borderRadius: '12@ms',
        padding: '10@ms',
    },
    countText: {
        color: 'white',
        fontSize: '24@ms',
        fontWeight: 'bold',
        marginBottom: '4@vs',
        fontFamily: 'July-Bold',
    },
    titleText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '12@ms',
        fontWeight: '500',
        fontFamily: 'July-Regular',
    },
    card: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    marginCard: {
        marginHorizontal: '16@ms',
        marginBottom: '20@vs',
        borderRadius: '20@ms',
        padding: '16@ms',
    },
    fullWidthCard: {
        marginBottom: '20@vs',
        paddingTop: '20@vs',
    },
    chartTitle: {
        color: '#1F2937',
        fontSize: '18@ms',
        fontWeight: 'bold',
        marginBottom: '20@vs',
        fontFamily: 'July-Bold',
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '20@vs',
        paddingBottom: '10@vs',
        gap: '16@ms',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: '8@ms',
        height: '8@ms',
        borderRadius: '4@ms',
        marginRight: '8@ms',
    },
    legendText: {
        color: '#6B7280',
        fontSize: '12@ms',
        fontFamily: 'July-Regular',
    },
    pieContainer: {
        alignItems: 'center',
        paddingTop: '16@vs',
        paddingBottom: '8@vs',
    },
    pieLegendWrap: {
        marginTop: '20@vs',
        width: '100%',
    },
    pieLegendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '8@vs',
        paddingHorizontal: '4@ms',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    pieLegendDot: {
        width: '12@ms',
        height: '12@ms',
        borderRadius: '6@ms',
        marginRight: '10@ms',
    },
    pieLegendLabel: {
        flex: 1,
        fontSize: '13@ms',
        color: '#374151',
        fontFamily: 'July-Regular',
    },
    pieLegendVal: {
        fontSize: '14@ms',
        color: '#1F2937',
        fontWeight: 'bold',
        fontFamily: 'July-Bold',
        marginLeft: '8@ms',
    },
    filterSection: {
        marginHorizontal: '16@ms',
        marginBottom: '10@vs',
        zIndex: 1, // needed for custom absolute dropdown overlays
    },
    filterTitle: {
        color: '#314158',
        fontSize: '14@ms',
        fontWeight: '600',
        marginBottom: '8@vs',
        marginTop: '10@vs',
        fontFamily: 'July-Medium',
    },
    dropdownContainer: {
        position: 'relative',
        zIndex: 10,
    },
    dropdownButton: {
        backgroundColor: '#F9FAFB',
        borderRadius: '12@ms',
        paddingVertical: '14@vs',
        paddingHorizontal: '16@ms',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        width: '100%',
    },
    dropdownButtonText: {
        fontSize: '14@ms',
        color: '#314158',
        fontFamily: 'July-Regular',
        flex: 1,
    },
    dropdownList: {
        backgroundColor: '#F9FAFB',
        borderRadius: '12@ms',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginTop: '4@vs',
        maxHeight: '200@vs',
        overflow: 'hidden',
    },
    dropdownItem: {
        paddingVertical: '12@vs',
        paddingHorizontal: '16@ms',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    dropdownItemText: {
        fontSize: '14@ms',
        color: '#314158',
        fontFamily: 'July-Regular',
    },
});

export default StatisticsScreen;
