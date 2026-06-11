import path from "path";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import type { Contract } from "@prisma/client";

Font.register({
  family: "Calibri",
  fonts: [
    { src: path.join(process.cwd(), "lib/pdf/fonts/Calibri-Regular.ttf"), fontWeight: "normal" },
    { src: path.join(process.cwd(), "lib/pdf/fonts/Calibri-Bold.ttf"), fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Calibri",
    fontSize: 11,
    padding: 48,
    color: "#1A1A1A",
    lineHeight: 1.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  brand: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E2231A",
  },
  brandSub: {
    fontSize: 8,
    color: "#666666",
    marginTop: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    textAlign: "center",
    color: "#666666",
    marginBottom: 20,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: 160,
    color: "#666666",
  },
  value: {
    flex: 1,
    fontWeight: "bold",
  },
  text: {
    fontSize: 10,
    color: "#333333",
  },
  footer: {
    marginTop: 36,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBlock: {
    width: "45%",
  },
  signatureLine: {
    marginTop: 36,
    borderTopWidth: 1,
    borderTopColor: "#999999",
    paddingTop: 4,
    fontSize: 9,
    color: "#666666",
  },
});

export function ContractDocument({
  contract,
  company,
}: {
  contract: Contract;
  company: { name: string; address: string; phone: string; email: string };
}) {
  const date = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(contract.createdAt);

  const price = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(contract.price);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>biuloo 必有路</Text>
            <Text style={styles.brandSub}>SUPPLY THE CHINESE GOOD CARS FOR THE WORLD</Text>
          </View>
          <View>
            <Text style={styles.text}>{company.name}</Text>
            <Text style={styles.text}>{company.address}</Text>
            <Text style={styles.text}>{company.phone}</Text>
            <Text style={styles.text}>{company.email}</Text>
          </View>
        </View>

        <Text style={styles.title}>Договор купли-продажи автомобиля № {contract.number}</Text>
        <Text style={styles.subtitle}>г. Минск, {date}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Стороны договора</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Продавец</Text>
            <Text style={styles.value}>{company.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Покупатель (ФИО)</Text>
            <Text style={styles.value}>{contract.clientName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Телефон покупателя</Text>
            <Text style={styles.value}>{contract.clientPhone}</Text>
          </View>
          {contract.clientPassport && (
            <View style={styles.row}>
              <Text style={styles.label}>Паспортные данные</Text>
              <Text style={styles.value}>{contract.clientPassport}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Предмет договора</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Автомобиль</Text>
            <Text style={styles.value}>{contract.carDescription}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Стоимость</Text>
            <Text style={styles.value}>{price}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Статус договора</Text>
            <Text style={styles.value}>
              {contract.status === "SIGNED" ? "Подписан" : "Черновик"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Условия договора</Text>
          <Text style={styles.text}>{contract.terms}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.signatureBlock}>
            <Text style={styles.text}>Продавец: {company.name}</Text>
            <Text style={styles.signatureLine}>Подпись / печать</Text>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={styles.text}>Покупатель: {contract.clientName}</Text>
            <Text style={styles.signatureLine}>Подпись</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
