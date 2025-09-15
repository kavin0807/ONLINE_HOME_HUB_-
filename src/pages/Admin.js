import React, { useEffect, useMemo, useState } from 'react';
import './Styles/Admin.css';

// LocalStorage key
const LS_KEY = 'adminProducts';

// Utility to load products from localStorage
const loadProducts = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse admin products from localStorage', e);
    return [];
  }
};

const saveProducts = (items) => {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
};

const initialForm = {
  id: null,
  name: '',
  brand: '',
  description: '',
  category: 'interior', // interior | exterior
  imageUrl: '',
  pricing: { price: '', currency: '₹', unit: '' }, // e.g., 588, ₹, sq ft
  features: '', // comma separated input in UI; stored as array on save
  technicalSpecifications: [{ key: '', value: '' }],
  engineering: {
    designParameters: [{ key: '', value: '' }],
    manufacturingConstraints: '',
    technicalDrawings: [{ name: '', url: '' }]
  },
  options: {
    interior: {
      material: '',
      colors: '', // comma separated
      layout: '', // dropdown
      comfortFeatures: [] // multi-select checkboxes
    },
    exterior: {
      colors: '', // comma separated
      finish: '', // dropdown
      designElements: [], // multi-select
      structuralVariations: ''
    }
  }
};

const comfortFeatureList = [
  'Ergonomic Design',
  'Noise Dampening',
  'Anti-slip',
  'Thermal Insulation',
  'Easy Clean'
];

const designElementsList = [
  'Modern Lines',
  'Classic Trim',
  'Curved Profiles',
  'Vent Grills',
  'Decorative Molding'
];

const Admin = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setItems(loadProducts());
  }, []);

  // Validation
  const validate = (state) => {
    const e = {};
    if (!state.name.trim()) e.name = 'Product name is required';
    if (!state.description.trim()) e.description = 'Description is required';
    if (!state.category) e.category = 'Category is required';

    if (!state.pricing.price || isNaN(Number(state.pricing.price))) {
      e.pricing = 'Valid price is required (number)';
    }
    if (!state.pricing.unit.trim()) {
      e.pricingUnit = 'Pricing unit is required (e.g., sq ft, bag, window)';
    }

    // Technical specs: if any key or value entered, ensure both
    state.technicalSpecifications.forEach((row, idx) => {
      if ((row.key && !row.value) || (!row.key && row.value)) {
        e[`spec_${idx}`] = 'Both key and value are required for technical specs';
      }
    });

    // Engineering drawings URLs validation (if provided)
    state.engineering.technicalDrawings.forEach((row, idx) => {
      if (row.url && !/^https?:\/\//i.test(row.url)) {
        e[`drawing_${idx}`] = 'Provide a valid http(s) URL for drawings';
      }
    });

    // Image URL (optional but validate format if present)
    if (state.imageUrl && !/^https?:\/\//i.test(state.imageUrl) && !state.imageUrl.startsWith('/')) {
      e.imageUrl = 'Use an absolute http(s) URL or a site-relative path starting with /';
    }

    return e;
  };

  const onChange = (path, value) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      // simple path setter: path like 'pricing.price' or 'options.interior.material'
      const parts = path.split('.');
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts[parts.length - 1]] = value;
      // realtime validation
      setErrors(validate(next));
      return next;
    });
  };

  const updateArrayField = (path, index, key, value) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      const parts = path.split('.');
      let cur = next;
      for (let i = 0; i < parts.length; i++) cur = cur[parts[i]];
      cur[index][key] = value;
      setErrors(validate(next));
      return next;
    });
  };

  const addArrayRow = (path, rowShape) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      const parts = path.split('.');
      let cur = next;
      for (let i = 0; i < parts.length; i++) cur = cur[parts[i]];
      cur.push(rowShape);
      return next;
    });
  };

  const removeArrayRow = (path, index) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      const parts = path.split('.');
      let cur = next;
      for (let i = 0; i < parts.length; i++) cur = cur[parts[i]];
      cur.splice(index, 1);
      setErrors(validate(next));
      return next;
    });
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setErrors({});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const eMap = validate(form);
    setErrors(eMap);
    if (Object.keys(eMap).length) return;

    // normalize
    const toSave = {
      ...form,
      id: form.id ?? Date.now(),
      features: form.features
        ? form.features.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      options: {
        interior: {
          ...form.options.interior,
          colors: form.options.interior.colors
            ? form.options.interior.colors.split(',').map((s) => s.trim()).filter(Boolean)
            : []
        },
        exterior: {
          ...form.options.exterior,
          colors: form.options.exterior.colors
            ? form.options.exterior.colors.split(',').map((s) => s.trim()).filter(Boolean)
            : []
        }
      },
      updatedAt: new Date().toISOString()
    };

    const next = [...items];
    const idx = next.findIndex((it) => it.id === toSave.id);
    if (idx >= 0) next[idx] = toSave; else next.unshift(toSave);
    setItems(next);
    saveProducts(next);
    setMessage({ type: 'success', text: `Product ${editingId ? 'updated' : 'added'} successfully` });
    resetForm();
  };

  const onEdit = (id) => {
    const it = items.find((x) => x.id === id);
    if (!it) return;
    setEditingId(id);
    // inflate back to form
    setForm({
      ...initialForm,
      ...it,
      features: (it.features || []).join(', '),
      options: {
        interior: {
          ...initialForm.options.interior,
          ...(it.options?.interior || {}),
          colors: (it.options?.interior?.colors || []).join(', ')
        },
        exterior: {
          ...initialForm.options.exterior,
          ...(it.options?.exterior || {}),
          colors: (it.options?.exterior?.colors || []).join(', ')
        }
      }
    });
    setErrors({});
    setMessage(null);
  };

  const onDelete = (id) => {
    const next = items.filter((x) => x.id !== id);
    setItems(next);
    saveProducts(next);
    if (editingId === id) resetForm();
  };

  const pricePreview = useMemo(() => {
    const p = form.pricing;
    if (!p.price) return '';
    return `${p.currency || ''}${p.price}${p.unit ? `/${p.unit}` : ''}`;
  }, [form.pricing]);

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Product Admin</h1>
        <p className="sub">Add, edit, and delete products with engineering details and options. Saved items appear on product pages automatically.</p>
      </header>

      {message && (
        <div className={`msg ${message.type}`}>{message.text}</div>
      )}

      <section className="admin-card">
        <h2 className="section-title">Product Configuration</h2>
        <form className="admin-form" onSubmit={onSubmit} noValidate>
          {/* Basic Info */}
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
            title="Enter a clear, concise product name"
          />
          <input
            type="text"
            placeholder="Brand (optional)"
            value={form.brand}
            onChange={(e) => onChange('brand', e.target.value)}
          />

          <select
            value={form.category}
            onChange={(e) => onChange('category', e.target.value)}
            title="Choose where this product should appear"
          >
            <option value="interior">Interior</option>
            <option value="exterior">Exterior</option>
          </select>

          <input
            type="url"
            placeholder="Image URL (http(s) or /images/...)"
            value={form.imageUrl}
            onChange={(e) => onChange('imageUrl', e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => onChange('description', e.target.value)}
          />

          {/* Pricing */}
          <div>
            <label className="kv">Price</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="Currency"
                value={form.pricing.currency}
                onChange={(e) => onChange('pricing.currency', e.target.value)}
                style={{ maxWidth: 80 }}
                title="Currency symbol or code"
              />
              <input
                type="number"
                placeholder="Amount"
                value={form.pricing.price}
                onChange={(e) => onChange('pricing.price', e.target.value)}
                style={{ maxWidth: 160 }}
                step="0.01"
              />
              <input
                type="text"
                placeholder="Unit (e.g., sq ft, bag, window)"
                value={form.pricing.unit}
                onChange={(e) => onChange('pricing.unit', e.target.value)}
                title="Unit for the pricing"
              />
            </div>
            <div className="kv">Preview: {pricePreview || '—'}</div>
            {errors.pricing && <div className="msg error">{errors.pricing}</div>}
            {errors.pricingUnit && <div className="msg error">{errors.pricingUnit}</div>}
          </div>

          {/* Features */}
          <input
            type="text"
            placeholder="Features (comma separated)"
            value={form.features}
            onChange={(e) => onChange('features', e.target.value)}
            title="List short bullet features, separated by commas"
          />

          {/* Technical Specs */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="kv">Technical Specifications</label>
            {form.technicalSpecifications.map((row, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, marginBottom: 6 }}>
                <input
                  type="text"
                  placeholder="Key (e.g., Density)"
                  value={row.key}
                  onChange={(e) => updateArrayField('technicalSpecifications', idx, 'key', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value (e.g., 2.4 g/cm³)"
                  value={row.value}
                  onChange={(e) => updateArrayField('technicalSpecifications', idx, 'value', e.target.value)}
                />
                <button type="button" className="btn-link danger" onClick={() => removeArrayRow('technicalSpecifications', idx)}>Remove</button>
                {errors[`spec_${idx}`] && <div className="msg error" style={{ gridColumn: '1 / -1' }}>{errors[`spec_${idx}`]}</div>}
              </div>
            ))}
            <button type="button" className="btn-link" onClick={() => addArrayRow('technicalSpecifications', { key: '', value: '' })}>+ Add spec</button>
          </div>

          {/* Engineering Sections */}
          <div className="admin-card" style={{ gridColumn: '1 / -1' }}>
            <h3 className="section-title">Engineering</h3>
            <div className="kv">Design Parameters</div>
            {form.engineering.designParameters.map((row, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, marginBottom: 6 }}>
                <input
                  type="text"
                  placeholder="Parameter (e.g., Load Rating)"
                  value={row.key}
                  onChange={(e) => updateArrayField('engineering.designParameters', idx, 'key', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value (e.g., 2 kN)"
                  value={row.value}
                  onChange={(e) => updateArrayField('engineering.designParameters', idx, 'value', e.target.value)}
                />
                <button type="button" className="btn-link danger" onClick={() => removeArrayRow('engineering.designParameters', idx)}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn-link" onClick={() => addArrayRow('engineering.designParameters', { key: '', value: '' })}>+ Add parameter</button>

            <div style={{ marginTop: 12 }}>
              <div className="kv">Manufacturing Constraints</div>
              <textarea
                placeholder="List constraints like minimum bend radius, max panel size, etc."
                value={form.engineering.manufacturingConstraints}
                onChange={(e) => onChange('engineering.manufacturingConstraints', e.target.value)}
              />
            </div>

            <div style={{ marginTop: 12 }}>
              <div className="kv">Technical Drawings</div>
              {form.engineering.technicalDrawings.map((row, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, marginBottom: 6 }}>
                  <input
                    type="text"
                    placeholder="Name (e.g., Section A-A)"
                    value={row.name}
                    onChange={(e) => updateArrayField('engineering.technicalDrawings', idx, 'name', e.target.value)}
                  />
                  <input
                    type="url"
                    placeholder="URL (http(s)://...)"
                    value={row.url}
                    onChange={(e) => updateArrayField('engineering.technicalDrawings', idx, 'url', e.target.value)}
                  />
                  <button type="button" className="btn-link danger" onClick={() => removeArrayRow('engineering.technicalDrawings', idx)}>Remove</button>
                  {errors[`drawing_${idx}`] && <div className="msg error" style={{ gridColumn: '1 / -1' }}>{errors[`drawing_${idx}`]}</div>}
                </div>
              ))}
              <button type="button" className="btn-link" onClick={() => addArrayRow('engineering.technicalDrawings', { name: '', url: '' })}>+ Add drawing</button>
            </div>
          </div>

          {/* Options - Interior */}
          <div className="admin-card" style={{ gridColumn: '1 / -1', display: form.category === 'interior' ? 'block' : 'block' }}>
            <h3 className="section-title">Interior Options</h3>
            <input
              type="text"
              placeholder="Material (e.g., Oak, PVC)"
              value={form.options.interior.material}
              onChange={(e) => onChange('options.interior.material', e.target.value)}
            />
            <input
              type="text"
              placeholder="Colors (comma separated)"
              value={form.options.interior.colors}
              onChange={(e) => onChange('options.interior.colors', e.target.value)}
              title="e.g., Walnut, White, Charcoal"
            />
            <select
              value={form.options.interior.layout}
              onChange={(e) => onChange('options.interior.layout', e.target.value)}
              title="Common interior layout profiles"
            >
              <option value="">Layout</option>
              <option value="Straight">Straight</option>
              <option value="Herringbone">Herringbone</option>
              <option value="Chevron">Chevron</option>
              <option value="Grid">Grid</option>
            </select>

            <div style={{ gridColumn: '1 / -1' }}>
              <div className="kv">Comfort Features</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {comfortFeatureList.map((cf) => (
                  <label key={cf} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input
                      type="checkbox"
                      checked={form.options.interior.comfortFeatures.includes(cf)}
                      onChange={(e) => {
                        const selected = new Set(form.options.interior.comfortFeatures);
                        if (e.target.checked) selected.add(cf); else selected.delete(cf);
                        onChange('options.interior.comfortFeatures', Array.from(selected));
                      }}
                    />
                    {cf}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Options - Exterior */}
          <div className="admin-card" style={{ gridColumn: '1 / -1', display: form.category === 'exterior' ? 'block' : 'block' }}>
            <h3 className="section-title">Exterior Options</h3>
            <input
              type="text"
              placeholder="Colors (comma separated)"
              value={form.options.exterior.colors}
              onChange={(e) => onChange('options.exterior.colors', e.target.value)}
            />
            <select
              value={form.options.exterior.finish}
              onChange={(e) => onChange('options.exterior.finish', e.target.value)}
              title="Finish options for exterior-facing products"
            >
              <option value="">Finish</option>
              <option value="Matte">Matte</option>
              <option value="Satin">Satin</option>
              <option value="Gloss">Gloss</option>
              <option value="Textured">Textured</option>
            </select>

            <div style={{ gridColumn: '1 / -1' }}>
              <div className="kv">Design Elements</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {designElementsList.map((de) => (
                  <label key={de} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input
                      type="checkbox"
                      checked={form.options.exterior.designElements.includes(de)}
                      onChange={(e) => {
                        const selected = new Set(form.options.exterior.designElements);
                        if (e.target.checked) selected.add(de); else selected.delete(de);
                        onChange('options.exterior.designElements', Array.from(selected));
                      }}
                    />
                    {de}
                  </label>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Structural Variations (notes)"
              value={form.options.exterior.structuralVariations}
              onChange={(e) => onChange('options.exterior.structuralVariations', e.target.value)}
            />
          </div>

          {/* Inline errors */}
          <div style={{ gridColumn: '1 / -1' }}>
            {errors.name && <div className="msg error">{errors.name}</div>}
            {errors.description && <div className="msg error">{errors.description}</div>}
            {errors.category && <div className="msg error">{errors.category}</div>}
            {errors.imageUrl && <div className="msg error">{errors.imageUrl}</div>}
          </div>

          <div className="actions">
            <button className="btn-primary" type="submit">{editingId ? 'Update Product' : 'Add Product'}</button>
            {editingId && (
              <button type="button" className="btn-link" onClick={resetForm} style={{ marginLeft: 12 }}>Cancel</button>
            )}
          </div>
        </form>
      </section>

      {/* Existing items table */}
      <section className="admin-card">
        <h2 className="section-title">Existing Products</h2>
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="6">No products yet. Add your first product above.</td>
                </tr>
              )}
              {items.map((it) => (
                <tr key={it.id}>
                  <td>{it.name}</td>
                  <td style={{ textTransform: 'capitalize' }}>{it.category}</td>
                  <td>{`${it.pricing?.currency || ''}${it.pricing?.price || ''}${it.pricing?.unit ? '/' + it.pricing.unit : ''}`}</td>
                  <td>{it.brand || '—'}</td>
                  <td>{new Date(it.updatedAt || it.id).toLocaleString()}</td>
                  <td>
                    <button className="btn-link" onClick={() => onEdit(it.id)}>Edit</button>
                    <button className="btn-link danger" onClick={() => onDelete(it.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="footer-actions">
          <div className="kv">Tip: Products appear on Interior or Exterior pages automatically based on the selected category.</div>
        </div>
      </section>
    </div>
  );
};

export default Admin;