'use server'
 
import { cookies } from 'next/headers'
 
export async function deleteCookie(data) {
  const cookieStore = await cookies()
  cookieStore.delete('name')
}
