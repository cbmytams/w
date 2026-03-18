/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BlogPage from './pages/BlogPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticleReaderPage from './pages/ArticleReaderPage';
import SearchDialog from './components/blog/SearchDialog';
import TestPage from './pages/TestPage';

export default function App() {
    return (
        <BrowserRouter basename="/wiki">
            <SearchDialog />
            <Routes>
                <Route path="/" element={<Navigate to="/blog" replace />} />
                <Route path="/test-articles" element={<TestPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:type/:id" element={<ArticleListPage />} />
                <Route path="/blog/:slug" element={<ArticleReaderPage />} />
            </Routes>
        </BrowserRouter>
    );
}
