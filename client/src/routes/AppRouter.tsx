import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BoardsPage from '@/pages/Boards';
import BoardPage from '@/pages/Board';
import IssuesPage from '@/pages/Issues';
import NotFoundPage from '@/pages/NotFound';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/issues" replace />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/board/:id" element={<BoardPage />} />
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
