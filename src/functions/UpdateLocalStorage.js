import { db } from '../firebase-config'
import { collection, getDocs} from 'firebase/firestore'

export default function UpdateLocalStorage(id) {

    const resetLocalStorage = () => {
        localStorage.removeItem('user')
    }

    const getToLocalStorage = async () => {
        let profiler = []
        const profilerCollectionRef = collection(db, 'profiler')

        const data = await getDocs(profilerCollectionRef)
        profiler = (data.docs.map((doc) => ({...doc.data(), id: doc.id })));

        console.log('profiler i updateLocalStorage: ', profiler );

        const updatedProfile = profiler.find((profil) => {
            return profil.id == id
        })

        localStorage.setItem('user', JSON.stringify(updatedProfile))
    }

    resetLocalStorage()
    getToLocalStorage()
}