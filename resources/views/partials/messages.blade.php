@if(session()->has('message'))
    <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-6" role="alert">
        <div class="flex">
            <div>
                <p class="text-sm">{{ session()->get('message') }}</p>
            </div>
        </div>
    </div>
@endif
