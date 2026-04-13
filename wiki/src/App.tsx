/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import BlogPage from "./pages/BlogPage";

const ArticleListPage = lazy(() => import("./pages/ArticleListPage"));
const ArticleReaderPage = lazy(() => import("./pages/ArticleReaderPage"));
const SearchDialog = lazy(() => import("./components/blog/SearchDialog"));
const TestPage = lazy(() => import("./pages/TestPage"));

export default function App() {
  return (
    <BrowserRouter basename="/wiki">
      <Suspense fallback={null}>
        <SearchDialog />
      </Suspense>
      <Routes>
        <Route path="/" element={<Navigate to="/blog" replace />} />
        <Route
          path="/test-articles"
          element={
            <Suspense fallback={null}>
              <TestPage />
            </Suspense>
          }
        />
        <Route path="/blog" element={<BlogPage />} />
        <Route
          path="/blog/:type/:id"
          element={
            <Suspense fallback={null}>
              <ArticleListPage />
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={null}>
              <ArticleReaderPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
