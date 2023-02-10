import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { AuthProvider } from '@context/authContext'

import LocationPage from "@pages/locationPage";
import AdminPage from "@pages/adminPage";
import SettingPage from "@pages/storePage";
import PageNotFound from "@pages/404"
import {PriveRoute, AuthRoute, Default} from './priveRouter';

export default function router() {
  return (
    <AuthProvider>
        <Router>
            <Routes>
                <Route exact path="/" element={<Default />} />
                <Route exact path="/location" element={<LocationPage />} />
                    <Route path="/admin" element={<AuthRoute />} >
                        <Route exact path="/admin" element={<AdminPage />} />
                    </Route>
                    <Route path="/admin/settings" element={<PriveRoute />}>
                        <Route exact path='/admin/settings' element={<SettingPage />} />
                    </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    </AuthProvider>
    
  )
}