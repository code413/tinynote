@if($errors->any())
    <div role="alert" class="mb-6 shadow-md">
        <div class="border border-red-400 rounded bg-red-100 px-4 py-3 text-red-700">
            @foreach($errors->all() as $error)
                <p>{{ $error }}</p>
            @endforeach
        </div>
    </div>
@endif


