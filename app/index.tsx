import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const modules = [
    {
      title: "Patient Registration",
      icon: "person-add",
      route: "/screens/registration",
      description: "Register new patients and update records"
    },
    {
      title: "Health Surveys",
      icon: "clipboard",
      route: "/screens/surveys",
      description: "Conduct health assessments"
    },
    {
      title: "Maternal Care",
      icon: "heart",
      route: "/screens/maternal",
      description: "Track maternal health and prenatal care"
    },
    {
      title: "Child Health",
      icon: "body",
      route: "/screens/child",
      description: "Monitoring child growth and immunization"
    },
    {
      title: "Appointments",
      icon: "calendar",
      route: "/screens/appointments",
      description: "Schedule and manage appointments"
    },
    {
      title: "Reports",
      icon: "stats-chart",
      route: "/screens/reports",
      description: "Generate and view health reports"
    }
  ];

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="py-8 px-4 bg-indigo-600">
        <Text className="text-3xl font-bold text-white mb-2">ASHA & ANM Portal</Text>
        <Text className="text-white text-lg">Healthcare at your fingertips</Text>
      </View>

      <View className="p-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-xl font-semibold text-gray-800">Quick Actions</Text>
          <Link href="/screens/profile" asChild>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-indigo-600 mr-1">My Profile</Text>
              <Ionicons name="person-circle-outline" size={24} color="#4f46e5" />
            </TouchableOpacity>
          </Link>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {modules.map((module, index) => (
            <Link key={index} href={module.route} asChild>
              <TouchableOpacity 
                className="w-[48%] bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100"
              >
                <Ionicons name={module.icon} size={32} color="#4f46e5" />
                <Text className="text-lg font-medium mt-2 text-gray-800">{module.title}</Text>
                <Text className="text-sm text-gray-500 mt-1">{module.description}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>

        <View className="mt-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <Text className="text-lg font-semibold mb-3 text-gray-800">Role Selection</Text>
          <View className="flex-row justify-between">
            <Link href="/screens/asha/dashboard" asChild>
              <TouchableOpacity className="w-[48%] bg-indigo-50 rounded-lg p-4 items-center border border-indigo-100">
                <Ionicons name="medical" size={32} color="#4f46e5" />
                <Text className="text-lg font-medium mt-2 text-indigo-700">ASHA Worker</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/screens/anm/dashboard" asChild>
              <TouchableOpacity className="w-[48%] bg-purple-50 rounded-lg p-4 items-center border border-purple-100">
                <Ionicons name="medkit" size={32} color="#7e22ce" />
                <Text className="text-lg font-medium mt-2 text-purple-700">ANM Worker</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
