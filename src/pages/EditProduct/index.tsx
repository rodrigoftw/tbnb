import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';

import Input from '../../components/Input';
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
import { ProductParams } from '../ProductDetail';
import { ProductFormData } from '../AddProduct';

interface Params {
  productParams: ProductParams;
}

const EditProduct: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const descriptionInputRef = useRef<TextInput>(null);
  const categoryInputRef = useRef<TextInput>(null);
  const amountInputRef = useRef<TextInput>(null);
  const priceInputRef = useRef<TextInput>(null);
  const { reset, goBack } = useNavigation();

  const route = useRoute();
  const routeParams = route.params as Params;
  console.log('ROUTE PARAMS:', routeParams.productParams);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const showInfoAlert = useCallback(() => {
    Alert.alert('All fields are required.');
  }, []);

  const returnToProductList = useCallback(() => {
    reset({
      routes: [{ name: 'ProductList' }],
      index: 0,
    });
  }, [reset]);

  const handleProductUpdate = useCallback(
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
          amount,
          price,
        };

        await api.put(`/products/${routeParams.productParams.id}`, formData);

        returnToProductList();
        Alert.alert('Product updated successfully.');
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
        <HeaderTitle>Edit Product</HeaderTitle>
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
            <Form
              initialData={routeParams.productParams}
              ref={formRef}
              onSubmit={handleProductUpdate}
            >
              <Input
                autoCapitalize="words"
                name="name"
                icon="archive"
                placeholder="Name"
                returnKeyType="next"
                multiline={false}
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
                  alignItems: 'flex-start',
                  isMultiline: true,
                  numberOfLines: 5,
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
                multiline={false}
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
                multiline={false}
                onSubmitEditing={() => {
                  priceInputRef.current?.focus();
                }}
              />

              <Input
                ref={priceInputRef}
                keyboardType="decimal-pad"
                name="price"
                icon="dollar-sign"
                placeholder="Price"
                returnKeyType="send"
                multiline={false}
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Update Product Details
              </Button>
            </Form>
          </Content>
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default EditProduct;
