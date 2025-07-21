import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";
import { Eye, EyeOff } from "lucide-react-native"; 

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "At least one uppercase letter required")
      .matches(/[a-z]/, "At least one lowercase letter required")
      .matches(/[0-9]/, "At least one number required")
      .matches(/[!@#$%^&*]/, "At least one special character required")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  });

  const handleSubmit = (values: any, { resetForm }: any) => {
    console.log("Submitted:", values);
    resetForm();
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-10">
      {/* Logo */}
      <View className="items-center mb-6">
        <Image
          source={require("../../assets/logo.png")} // Replace with your logo
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </View>

      {/* Form */}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View className="space-y-4">
            {/* Name Field */}
            <LinearGradient
              colors={["#e0f7fa", "#e0ffff"]}
              className="rounded-lg p-[1px]"
            >
              <View className="bg-white rounded-lg px-4 py-3">
                <TextInput
                  placeholder="Full Name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  className="text-black"
                />
              </View>
            </LinearGradient>
            {touched.name && errors.name && (
              <Text className="text-red-500 text-sm">{errors.name}</Text>
            )}

            {/* Email Field */}
            <LinearGradient
              colors={["#e0f7fa", "#e0ffff"]}
              className="rounded-lg p-[1px]"
            >
              <View className="bg-white rounded-lg px-4 py-3">
                <TextInput
                  placeholder="Email"
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  className="text-black"
                />
              </View>
            </LinearGradient>
            {touched.email && errors.email && (
              <Text className="text-red-500 text-sm">{errors.email}</Text>
            )}

            {/* Password Field */}
            <LinearGradient
              colors={["#e0f7fa", "#e0ffff"]}
              className="rounded-lg p-[1px]"
            >
              <View className="bg-white rounded-lg px-4 py-3 flex-row items-center justify-between">
                <TextInput
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  className="flex-1 text-black"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff size={20} color="gray" />
                  ) : (
                    <Eye size={20} color="gray" />
                  )}
                </TouchableOpacity>
              </View>
            </LinearGradient>
            {touched.password && errors.password && (
              <Text className="text-red-500 text-sm">{errors.password}</Text>
            )}

            {/* Confirm Password Field */}
            <LinearGradient
              colors={["#e0f7fa", "#e0ffff"]}
              className="rounded-lg p-[1px]"
            >
              <View className="bg-white rounded-lg px-4 py-3 flex-row items-center justify-between">
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirm}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  className="flex-1 text-black"
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? (
                    <EyeOff size={20} color="gray" />
                  ) : (
                    <Eye size={20} color="gray" />
                  )}
                </TouchableOpacity>
              </View>
            </LinearGradient>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text className="text-red-500 text-sm">{errors.confirmPassword}</Text>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              disabled={isSubmitting}
              onPress={handleSubmit as any}
              className="bg-[#007aff] py-3 rounded-xl items-center mt-4"
            >
              <Text className="text-white font-bold text-lg">
                {isSubmitting ? "Registering..." : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default SignupForm;
