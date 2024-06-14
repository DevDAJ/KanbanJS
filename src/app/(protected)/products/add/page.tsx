'use client';
import { db, storage } from '@/config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Form, Formik } from 'formik';

import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { v4 } from 'uuid';

export default function AddProducts() {
  const uuid = v4();
  const storageRef = ref(storage, uuid + '/product-image');
  async function onFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    return uploadBytes(storageRef, file).then(async ({ ref }) => {
      console.log('File uploaded successfully');
      return await getDownloadURL(storageRef).then((url) => url);
    });
  }
  const router = useRouter();
  return (
    <div className="mx-80 my-10 p-4 flex flex-col items-center bg-slate-800 rounded-3xl">
      <h1 className="text-purple-300 text-xl font-bold my-6">Product Upload Form</h1>
      <Formik
        initialValues={{ name: undefined, price: 0, thumbnail: undefined }}
        onSubmit={async (values) => {
          try {
            const ref = doc(db, 'products', uuid.toString());
            await setDoc(ref, values).then(() => {
              console.log('Document successfully written! with id: ', uuid);
              router.push('/products');
            });
          } catch (e) {
            console.error('Error adding document: ', e);
          }
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Form className="flex flex-col w-80 gap-2" onSubmit={handleSubmit}>
            {values.thumbnail && (
              <Image src={values.thumbnail} alt="thumbnail" width={600} height={600} />
            )}
            <div className="flex flex-col">
              <label className="text-gray-200" htmlFor="thumbnail">
                Thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onFileUpload(e).then((url) => setFieldValue('thumbnail', url))}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-200" htmlFor="name">
                Product Name
              </label>
              <input
                className="bg-gray-200 text-slate-800 rounded-md p-2"
                type="text"
                id="name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-200" htmlFor="price">
                Price
              </label>
              <input
                className='bg-gray-200 text-slate-800 rounded-md p-2 appearance-none before:content-\"RM\" before:text-purple-300'
                type="number"
                id="price"
                min={0}
                value={values.price}
                onChange={handleChange}
              />
            </div>
            <button className="bg-purple-300 text-gray-700 p-2 rounded-md" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
