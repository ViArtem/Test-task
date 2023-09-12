<template>
  <div class="wrapper">
    <div class="container">
      <div class="cars">
        <div class="cars__empty" v-if="cars.length === 0">Тут поки нічого немає</div>
        <ul class="cars__list" v-else>
          <li class="cars__item" v-for="car in cars" :key="car?._id">
            <h2 class="cars__name">{{ car.brand_name }}</h2>
            <h2 class="cars__date">{{ car.date }}</h2>
            <h2 class="cars__price">{{ car.price }}$</h2>
            <hr />
            <div class="cars__buttons">
              <button class="cars__button cars__button_red" @click="deleteCar(car._id as number)">
                Видалити
              </button>
              <button class="cars__button cars__button_blue" @click="openEditCarModal(car)">
                Редагувати
              </button>
            </div>
          </li>
        </ul>
        <form class="cars__form create-form" @submit.prevent="createCar">
          <div class="create-form__body">
            <fieldset class="create-form__block">
              <input
                type="date"
                class="create-form__input"
                v-model="car.date"
                @focus="dateNotCorrect = false"
              />
              <div class="create-form__error" v-if="dateNotCorrect">Оберіть дату!</div>
            </fieldset>
            <fieldset class="create-form__block">
              <input
                type="text"
                class="create-form__input"
                v-model="car.brand_name"
                placeholder="Введіть назву бренду"
                @focus="brandNameNotCorrect = false"
              />
              <div class="create-form__error" v-if="brandNameNotCorrect">
                Введіть коректні дані!
              </div>
            </fieldset>
            <fieldset class="create-form__block">
              <input
                type="number"
                class="create-form__input"
                v-model="car.price"
                placeholder="Введіть ціну"
                @focus="priceNotCorrect = false"
              />
              <div class="create-form__error" v-if="priceNotCorrect">Введіть коректні дані!</div>
            </fieldset>
            <fieldset class="create-form__block">
              <button type="submit" class="create-form__button">Create</button>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
    <div class="modal" v-if="isEditModal">
      <div class="modal__wrapper" @click.self="isEditModal = false">
        <div class="modal__body">
          <form class="modal__form create-form" @submit.prevent="editCar">
            <div class="create-form__body">
              <fieldset class="create-form__block">
                <input type="date" class="create-form__input" v-model="carCopy.date" />
              </fieldset>
              <fieldset class="create-form__block">
                <input
                  type="text"
                  class="create-form__input"
                  v-model="carCopy.brand_name"
                  placeholder="Введіть назву бренду"
                />
              </fieldset>
              <fieldset class="create-form__block">
                <input
                  type="number"
                  class="create-form__input"
                  v-model="carCopy.price"
                  placeholder="Введіть ціну"
                />
              </fieldset>
              <fieldset class="create-form__block">
                <button type="submit" class="create-form__button">Edit</button>
              </fieldset>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Car } from '@/models'
import axios from 'axios'
import xmlbuilder from 'xmlbuilder'

const URL = import.meta.env.VITE_APP_URL
const car = ref<Car>({
  date: '',
  brand_name: '',
  price: null
})
const cars = ref<Car[]>([])

const dateNotCorrect = ref(false)
const brandNameNotCorrect = ref(false)
const priceNotCorrect = ref(false)

const isEditModal = ref(false)
const carCopy = ref<Car>({
  date: '',
  brand_name: '',
  price: null
})

const getCars = async (): Promise<void> => {
  try {
    const response = await axios.get(`${URL}/get/all`)
    cars.value = response.data
  } catch (e) {
    console.log(e)
  }
}
onMounted(getCars)

const editDate = (date: string): string => {
  const array = date.split('-')
  const reverseArray = array.reverse()
  const editedValue = reverseArray.join('.')
  return editedValue
}

const openEditCarModal = async (car: Car) => {
  console.log(car)
  isEditModal.value = true
  carCopy.value = { ...car, date: car.date.split('.').reverse().join('-') }
}

const editCar = async () => {
  try {
    const formattedDate = editDate(carCopy.value.date)
    const editedXML = xmlbuilder
      .create('Document')
      .ele('Car')
      .ele('Id', carCopy.value._id)
      .up()
      .ele('Date', formattedDate)
      .up()
      .ele('BrandName', carCopy.value.brand_name)
      .up()
      .ele('Price', carCopy.value.price as number)
      .end({ pretty: true })
    const config = {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
    await axios.put(`${URL}/edit`, editedXML, config)
    await getCars()
    isEditModal.value = false
  } catch (e) {
    console.log(e)
  }
}

const createCar = async (): Promise<void> => {
  if (!car.value.date) {
    dateNotCorrect.value = true
  }
  if (car.value.brand_name.length < 1) {
    brandNameNotCorrect.value = true
  }
  if (!car.value.price || car.value.price < 1) {
    priceNotCorrect.value = true
  }
  if (car.value.date && car.value.brand_name.length > 1 && car.value.price && car.value.price > 1) {
    const formattedDate = editDate(car.value.date)
    const xml: string = xmlbuilder
      .create('Document')
      .ele('Car')
      .ele('Date', formattedDate)
      .up()
      .ele('BrandName', car.value.brand_name)
      .up()
      .ele('Price', car.value.price)
      .end({ pretty: true })
    try {
      const config = {
        headers: {
          'Content-Type': 'application/xml'
        }
      }
      await axios.post(`${URL}/create`, xml, config)
      await getCars()
      car.value = {
        brand_name: '',
        price: null,
        date: ''
      }
    } catch (e) {
      console.log(e)
    }
  }
}

const deleteCar = async (id: number) => {
  try {
    const deletedXML = xmlbuilder.create('Document').ele('Car').ele('Id', id).end({ pretty: true })
    await axios.delete(`${URL}/delete`, {
      data: deletedXML,
      headers: {
        'Content-Type': 'application/xml'
      }
    })
    await getCars()
  } catch (e) {
    console.log(e)
  }
}
</script>

<style scoped src="./assets/app.scss"></style>
