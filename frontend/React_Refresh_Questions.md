# React Syntax Refresh: 20 Questions & Answers (Enhanced)

This guide is based on the patterns used in your Inventory Management project. It includes real code snippets from your project to help you understand how these concepts are applied.

---

### 1. What is the purpose of `useState` in React?
**Answer:** `useState` is a Hook that lets you add state to a functional component. It returns an array with two values: the current state value and a function to update it.

**Example from `src/pages/Products.jsx`:**
```javascript
const [products, setProducts] = useState([]);
```
**Explanation:** Here, `products` starts as an empty array `[]`. When we fetch data from the server, we use `setProducts(res.data)` to update this list. React then automatically re-renders the page to show the new products.

---

### 2. How do you pass data from a parent component to a child component?
**Answer:** You pass data using **props** (short for properties). You add them as attributes to the child component in the parent's JSX.

**Example from `src/App.jsx`:**
```javascript
<Route path="/" element={<Dashboard />} />
```
**Explanation:** In this case, `path` and `element` are props being passed to the `Route` component. The `Route` component uses these props to know what to display when you visit a specific URL.

---

### 3. What hook do you use to perform side effects like fetching data when a component loads?
**Answer:** The `useEffect` hook. If you provide an empty dependency array `[]`, the code inside will run only once after the component first renders.

**Example from `src/pages/Products.jsx`:**
```javascript
useEffect(() => {
  fetchProducts();
}, []);
```
**Explanation:** This code tells React: "As soon as the Products page is visible on the screen, run the `fetchProducts` function." The `[]` at the end ensures it doesn't run again every time the state changes.

---

### 4. How do you render a list of items in React?
**Answer:** You use the JavaScript `.map()` method to loop over an array and return JSX for each item.

**Example from `src/pages/Products.jsx`:**
```javascript
{products.map((p) => (
  <tr key={p.id}>
    <td>{p.name}</td>
    {/* ... other columns */}
  </tr>
))}
```
**Explanation:** This takes your `products` array and "transforms" each product object `p` into a table row `<tr>`. This is the standard way to display lists in React.

---

### 5. Why is the `key` prop important when rendering lists?
**Answer:** The `key` helps React identify which items have changed, been added, or been removed. It is essential for performance and to ensure the UI updates correctly.

**Example from `src/pages/Products.jsx`:**
```javascript
<tr key={p.id} className="hover:bg-slate-50 transition-colors">
```
**Explanation:** By giving each row a unique `key` (like `p.id`), React can efficiently update only the specific row that changed instead of re-rendering the entire table.

---

### 6. What is a "controlled component" in React?
**Answer:** A controlled component is an input element whose value is controlled by React state. The state is the "single source of truth."

**Example from `src/pages/Products.jsx`:**
```javascript
<input
  name="name"
  value={newProduct.name}
  onChange={handleChange}
/>
```
**Explanation:** The input's `value` is tied to `newProduct.name`. If you try to type, nothing happens unless the `onChange` function updates the state. This gives React full control over the form data.

---

### 7. How do you handle a button click in a React component?
**Answer:** You use the `onClick` attribute and pass it a function.

**Example from `src/pages/Products.jsx`:**
```javascript
<button onClick={() => handleDelete(p.id)}>Delete</button>
```
**Explanation:** When the button is clicked, it triggers the `handleDelete` function and passes the specific product's `id`.

---

### 8. What does `export default` do in a React file?
**Answer:** It makes the component available to be imported into other files. You can only have one default export per file.

**Example from `src/components/Navbar.jsx`:**
```javascript
export default Navbar;
```
**Explanation:** This allows you to go into `DashboardLayout.jsx` and write `import Navbar from "../components/Navbar"`.

---

### 9. How do you conditionally show a piece of UI in React?
**Answer:** You can use JavaScript logical operators like `&&` or ternary operators `? :`.

**Example from `src/pages/Products.jsx`:**
```javascript
<h2 className="text-lg font-semibold mb-4 text-slate-700">
  {editingId ? "Edit Product" : "Add New Product"}
</h2>
```
**Explanation:** This check "Is `editingId` not null?". If true, it shows "Edit Product". If false (null), it shows "Add New Product".

---

### 10. What is the purpose of the `Link` component in `react-router-dom`?
**Answer:** `Link` allows you to navigate between pages without the page refreshing.

**Example from `src/components/Navbar.jsx`:**
```javascript
<Link to="/products">Products</Link>
```
**Explanation:** Unlike a standard `<a href="...">`, this `Link` tells React Router to change the URL and update the view without hitting the server for a new HTML page.

---

### 11. How do you update an object in state without losing other properties?
**Answer:** You use the **spread operator** (`...`) to copy the existing properties.

**Example from `src/pages/Products.jsx`:**
```javascript
setNewProduct({
  ...newProduct,
  [e.target.name]: e.target.value,
});
```
**Explanation:** This says: "Keep everything currently in `newProduct` (`...newProduct`), but update the specific field that just changed (`[e.target.name]`)."

---

### 12. What is the difference between `useState` and a regular variable?
**Answer:** Updating state triggers a re-render; updating a regular variable does not.

**Example Context:**
In your `Products.jsx`, if you just used `let search = ""`, typing in the search box would change the variable, but the list of products on the screen would never filter because React wouldn't know it needs to refresh the UI.

---

### 13. How do you prevent a form from refreshing the page on submit?
**Answer:** Inside the `onSubmit` handler, call `e.preventDefault()`.

**Example from `src/pages/Products.jsx`:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  // ... rest of logic
};
```
**Explanation:** By default, HTML forms reload the page. This line stops that behavior so we can handle the data with JavaScript instead.

---

### 14. What is a functional component?
**Answer:** A JavaScript function that returns JSX.

**Example from `src/pages/Products.jsx`:**
```javascript
function Products() {
  return (
    <div>...</div>
  );
}
```
**Explanation:** This is the modern standard. It's just a function that defines what the UI should look like.

---

### 15. How do you import another component?
**Answer:** Use the `import` statement at the top of the file.

**Example from `src/App.jsx`:**
```javascript
import Dashboard from "./pages/Dashboard";
```
**Explanation:** This brings the `Dashboard` code into `App.jsx` so it can be used inside the `<Routes>`.

---

### 16. What is the purpose of `props`?
**Answer:** Props allow components to be reusable.

**Context:**
Imagine you created a `Button` component. You could pass a prop like `color="blue"` or `color="red"` to make the same component look different in different places.

---

### 17. Can you use hooks inside a regular JavaScript function?
**Answer:** No. Hooks must be inside a React functional component or a custom hook.

**Example Context:**
You cannot use `useState` inside the `getProducts` function in `productService.js` because that's just a plain data service, not a UI component.

---

### 18. What is the dependency array in `useEffect`?
**Answer:** It tells React when to re-run the effect.

**Example:**
If you put `[search]` in the array: `useEffect(() => { ... }, [search])`, the code would run every single time you type in the search box.

---

### 19. What does `className` do in React?
**Answer:** It applies CSS classes. React uses `className` because `class` is a reserved word in JavaScript.

**Example from `src/pages/Products.jsx`:**
```javascript
<div className="p-6">
```
**Explanation:** This applies Tailwind CSS padding to the container.

---

### 20. How do you handle multiple inputs in one state object?
**Answer:** Use the `name` attribute of the input to identify which property to update.

**Example from `src/pages/Products.jsx`:**
```javascript
<input name="price" onChange={handleChange} />
<input name="quantity" onChange={handleChange} />
```
**Explanation:** The `handleChange` function uses `e.target.name` to know if it should update the `price` or the `quantity` in the state object.
