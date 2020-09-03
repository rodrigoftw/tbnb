import React, { useCallback, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';

import Input from '../../components/Input';
import CurrencyInput from '../../components/CurrencyInput';
import Button from '../../components/Button';

import { Feather } from '@expo/vector-icons';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  InfoButton,
  Content,
} from './styles';

export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  amount: string;
  price: string;
}

const AddProduct: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const descriptionInputRef = useRef<TextInput>(null);
  const categoryInputRef = useRef<TextInput>(null);
  const amountInputRef = useRef<TextInput>(null);
  const priceInputRef = useRef<TextInput>(null);
  const { reset, goBack } = useNavigation();

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const showInfoAlert = () => {
    Alert.alert('All fields are required.');
  };

  const returnToProductList = useCallback(() => {
    reset({
      routes: [{ name: 'ProductList' }],
      index: 0,
    });
  }, [reset]);

  const handleAddProduct = useCallback(
    async (data: ProductFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Product name is required.'),
          description: Yup.string().required(
            'Product description is required.',
          ),
          category: Yup.string().required('Product category is required.'),
          amount: Yup.number().required('Product amount is required.'),
          price: Yup.string().required('Product price is required.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, description, category, amount, price } = data;

        const formData = {
          name,
          description,
          category,
          amount: Number(amount),
          price: parseFloat(price),
        };

        await api.post('/products', formData);

        Alert.alert('Product created successfully.');
        returnToProductList();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Error updating this product.',
          'An error ocurred while updating this product, please try again.',
        );
      }
    },
    [goBack],
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      backgroundColor: 'white',
      borderColor: 'gray',
      borderWidth: 1,
      fontSize: 20,
      marginBottom: 20,
      marginTop: 20,
      padding: 20,
      textAlign: 'right',
      width: 300,
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <Header>
        <BackButton onPress={() => navigateBack()}>
          <Feather name="arrow-left" size={22} color="#f4ede8" />
        </BackButton>
        <HeaderTitle>New Product</HeaderTitle>
        <InfoButton onPress={() => showInfoAlert()}>
          <Feather name="info" size={22} color="#f4ede8" />
        </InfoButton>
      </Header>
      <Container>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Content>
            <Form ref={formRef} onSubmit={handleAddProduct}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="archive"
                placeholder="Name"
                returnKeyType="next"
                containerStyle={{
                  marginTop: 24,
                }}
                onSubmitEditing={() => {
                  descriptionInputRef.current?.focus();
                }}
              />

              <Input
                ref={descriptionInputRef}
                autoCorrect={true}
                autoCapitalize="sentences"
                name="description"
                icon="file-text"
                placeholder="Description"
                returnKeyType="next"
                multiline={true}
                containerStyle={{
                  height: 150,
                  paddingTop: 16,
                  paddingRight: 16,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  isMultiline: true,
                  numberOfLines: 10,
                  textAlign: 'justify',
                  width: 'auto',
                }}
                onSubmitEditing={() => {
                  categoryInputRef.current?.focus();
                }}
              />

              <Input
                ref={categoryInputRef}
                name="category"
                icon="list"
                placeholder="Category"
                returnKeyType="next"
                onSubmitEditing={() => {
                  amountInputRef.current?.focus();
                }}
              />

              <Input
                ref={amountInputRef}
                keyboardType="number-pad"
                name="amount"
                icon="bar-chart"
                placeholder="Amount"
                returnKeyType="next"
                onSubmitEditing={() => {
                  priceInputRef.current?.focus();
                }}
              />

              <CurrencyInput
                ref={priceInputRef}
                keyboardType="numeric"
                name="price"
                icon="dollar-sign"
                placeholder="Price"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Create New Product
              </Button>
            </Form>
          </Content>
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default AddProduct;
