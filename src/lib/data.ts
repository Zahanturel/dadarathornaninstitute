import booksData from '../data/books.json';
import schemesData from '../data/schemes.json';
import mandalData from '../data/mandal.json';
import exStudentsData from '../data/ex-students.json';
import logoData from '../data/logo.json';
import galleryData from '../data/gallery.json';
import downloadsData from '../data/downloads.json';
import educationData from '../data/education.json';
import sscData from '../data/achievers/ssc.json';
import nirangDinData from '../data/achievers/nirang-din.json';
import students2526 from '../data/students/2025-26.json';

export interface StudentEntry {
  no: number;
  name: string;
  std: string;
}

export interface StudentList {
  year: string;
  label: string;
  schoolLabel: string;
  students: StudentEntry[];
  total: number;
}

export interface ActivityYear {
  year: string;
  items: string[];
}

export interface SscAchiever {
  year: string;
  name: string;
  percent: string;
  note?: string;
}

export interface NirangDinPerformer {
  name: string;
  count: number;
  year: string;
}

export interface Book {
  no: number;
  title: string;
  lang: string;
  price: string;
}

export interface ExStudent {
  years: string;
  name: string;
  status: string;
}

const activityModules = import.meta.glob<{ default: ActivityYear }>(
  '../data/activities/*.json',
  { eager: true, import: 'default' }
);

const YEAR_ORDER = [
  '2025–26', '2024–25', '2023–24', '2022–23', '2021–22',
];

export function getBooks() {
  return booksData;
}

export function getSchemes() {
  return schemesData;
}

export function getMandal() {
  return mandalData;
}

export function getExStudents() {
  return exStudentsData;
}

export function getLogo() {
  return logoData;
}

export function getGallery() {
  return galleryData;
}

export function getDownloads() {
  return downloadsData;
}

export function getEducation() {
  return educationData;
}

export function getSscAchievers() {
  return sscData;
}

export function getNirangDinPerformers() {
  return nirangDinData;
}

export function getStudentList(year: string): StudentList {
  return students2526 as StudentList;
}

export function getCurrentStudentYear() {
  return '2025-26';
}

export function getArchivedStudentYears() {
  return [];
}

export function getActivities(): ActivityYear[] {
  const activities = Object.values(activityModules) as ActivityYear[];
  return activities.sort(
    (a, b) => YEAR_ORDER.indexOf(a.year) - YEAR_ORDER.indexOf(b.year)
  );
}

export function getLatestHighlights() {
  return educationData.latestHighlights;
}

export const langLabel: Record<string, string> = booksData.langCodes;
