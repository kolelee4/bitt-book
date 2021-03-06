import firebase from 'firebase'
import {ref, firebaseAuth} from '../config/base'
import {getCookie} from './cookies'

export function auth(email, password) {
  return firebaseAuth().createUserWithEmailAndPassword(email, password)
    // eslint-disable-next-line
    .then((saveUser))
}

export function saveUser(user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      displayName: localStorage.getItem(`${user.email}-display-name`) || getCookie(`${user.email}-display-name`),
      email:       user.email,
      uid:         user.uid
    })
    .then(() => {
      user.updateProfile({
        displayName: localStorage.getItem(`${user.email}-display-name`)
      })

      user.sendEmailVerification()
    })
}

export function getCurrentUser() {
  return firebase.auth().currentUser
}

export function login(email, password) {
  return firebaseAuth().signInWithEmailAndPassword(email, password)
    .then(() => {
      localStorage.setItem(`${email}-display-name`, getCurrentUser().displayName)
    })
}

export function logout() {
  return firebaseAuth().signOut()
}

export function reauthenticate(password) {
  const user = getCurrentUser()

  const credential = firebaseAuth.EmailAuthProvider.credential(
    user.email,
    password
  )

  return user.reauthenticateWithCredential(credential)
}

export function saveNewDisplayName(newDisplayName) {
  const user = getCurrentUser()

  return user.updateProfile({
    displayName: newDisplayName
  })
}

export function saveNewEmail(newEmail) {
  const user = getCurrentUser()

  return user.updateEmail(newEmail)
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveNewPassword(newPassword) {
  const user = getCurrentUser()

  return user.updatePassword(newPassword)
}

export function deleteAccount() {
  const user = getCurrentUser()
  const uid = getCurrentUser().uid

  ref.child('users').child(uid).remove()

  return user.delete()
}
